import express from "express";
import { auth } from "express-openid-connect";
import pkg from "express-openid-connect";
import { Instance, User, connectDB } from "./db.mjs";
import expressWS from "express-ws";
import { Client } from "ssh2";
import { readFileSync } from "fs";
import mime from "mime-types";

const { requiresAuth } = pkg;
const app = express();
expressWS(app);
const port = process.env.PORT || 8080;

const start = async (port = 8080) => {
    await connectDB();
    try {
        console.log("Server started at http://localhost:8080");
        app.listen(port);
    } catch {
        console.error("Server failed to start on port 8080");
    }
};

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: "3e2f945c16be4abd22bd8f5a0c29f936faa2df9e4c0aae4ad535f11b375e78ee",
    baseURL: "http://localhost:8080",
    clientID: "H7XB0nqaUMvT04BEWjHGd8XVMurd19vc",
    issuerBaseURL: "https://dev-udfh6hlmwichh7u0.us.auth0.com",
};

app.use(auth(config));

const userProfileMiddleware = async (req, res, next) => {
    if (!req.oidc.user) {
        res.redirect("/login");
        return;
    }
    const userProfile = req.oidc.user;
    const loginId = userProfile.sub.replace("github|", "");
    const users = await User.findOne({ id: loginId });

    if (users === null) {
        const userInfoReq = await fetch(
            "https://api.github.com/users/" + userProfile.nickname
        );
        const gitUser = await userInfoReq.json();
        const user = new User(gitUser);
        await user.save();
    }
    next();
};

app.use(requiresAuth(), userProfileMiddleware);

app.ws("/username/:username/workspace/:workspace/console", async (ws, req) => {
    const { username, workspace } = req.params;
    const filter = {
        username: username,
        workspace: workspace,
    };
    const runningInstance = await Instance.findOne(filter);
    
    if(!runningInstance) {
        ws.status(500).send("Error");
    }
    const ip = await runningInstance.serverIP;

    const conn = new Client({ allowHalfOpen: true });
    conn
        .on("ready", () => {
            conn.shell((err, stream) => {
                if (err) {
                    console.log("Error: " + err);
                    ws.status(500).send("Error");
                } 
                let lastCommand = "";

                // TODO: Extract start up script to YAML File
                stream.write(
                    "sudo apt-get install git -y && sudo apt-get install tree && sudo apt-get update && sudo apt-get install python-pip -y && " +
                    "git clone https://www.github.com/" +
                    username +
                    "/" +
                    workspace +
                    " && " +
                    "cd " +
                    workspace +
                    " \n"
                );
                ws.on("message", function (msg) {
                    lastCommand = msg;
                    stream.write(msg + "\n");
                });

                stream
                    .on("close", () => {
                        console.log("Stream :: close");
                        conn.end();
                    })
                    .on("data", (data) => {
                        let output = data.toString();
                        if (output.startsWith(lastCommand)) {
                            output = output.replace(lastCommand, "");
                        }
                        ws.send(output);
                    });
            });
        })
        .connect({
            host: ip,
            username: "arjunrajpal1234",
            privateKey: readFileSync("/home/node/.ssh/gcloud"),
        });
});

app.get(
    "/username/:username/workspace/:workspace/listFiles",
    async (req, res) => {
        const { username, workspace } = req.params;
        const filter = {
            username: username,
            workspace: workspace,
        };
        const runningInstance = await Instance.findOne(filter);
        if (runningInstance === null) {
            res.status(500).send("Error");
        }
        const ip = await runningInstance?.serverIP;
        console.log(ip);
        const lsCommand = "tree -J ./${workspace} \nexit\n";
        const conn = new Client({ allowHalfOpen: true });
        conn
            .on("ready", function () {
                console.log("Client :: ready");
                conn.exec(lsCommand, function (err, stream) {
                    stream
                        .on("close", function (code, signal) {
                            console.log(
                                "Stream :: close :: code: " + code + ", signal: " + signal
                            );
                            conn.end();
                        })
                        .on("data", function (data) {
                            res.send(JSON.parse(data.toString()));
                        })
                        .stderr.on("data", function (data) {
                            console.log("STDERR: " + data);
                        });
                });
            })
            .connect({
                host: ip,
                username: "arjunrajpal1234",
                privateKey: readFileSync("/home/node/.ssh/gcloud"),
            });
    }
);

app.get(
    "/username/:username/workspace/:workspace/filePath/*",
    async (req, res) => {
        const { username, workspace } = req.params;
        const filePath = req.params[0];
        const lsCommand = `cd ${workspace} && cat ./${filePath}`;
        const mimeType = mime.lookup(filePath);
        const filter = {
            username: username,
            workspace: workspace,
        };
        const runningInstance = await Instance.findOne(filter);
        const ip = await runningInstance.serverIP;

        const conn = new Client({ allowHalfOpen: true });
        conn
            .on("ready", function () {
                console.log("Client :: ready");
                conn.exec(lsCommand, function (err, stream) {
                    if (err) {
                        console.log("Error: " + err);
                        res.send("Error");
                    } 
                    stream
                        .on("close", function (code, signal) {
                            console.log(
                                "Stream :: close :: code: " + code + ", signal: " + signal
                            );
                            conn.end();
                        })
                        .on("data", async (data) => {
                            res.setHeader("Content-Type", mimeType);
                            res.send(data);
                        });
                });
            })
            .connect({
                host: ip,
                username: "arjunrajpal1234",
                privateKey: readFileSync("/home/node/.ssh/gcloud"),
            });
    }
);

start(port);
