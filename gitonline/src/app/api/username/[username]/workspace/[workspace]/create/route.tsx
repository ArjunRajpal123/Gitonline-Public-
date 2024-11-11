export const maxDuration = 35;
import {
  cleanName,
  createInstance,
  getConfig,
  getInstance,
  getInstanceIP
} from "@/app/utils/gcloud";
import { parse } from "querystring";
import { Instance } from "@/app/utils/models";
import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "@/app/utils/db";
import { redirect } from "next/navigation";


export async function POST(
  request: Request,
  { params }: { params: { username: string; workspace: string } }
) {
  console.info(
    `Create VM Request Made Type: NA Username: ${params.username}, Workspace: ${params.workspace}`
  );
  const rawBody = await request.text();
  const requestBody = parse(rawBody);
  const vmType = requestBody.vmType;

  if (!vmType || Array.isArray(vmType)) {
    return Response.json({ error: "Invalid VM Selection" }, { status: 400 });
  }

  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return Response.redirect("/");
  }

  const { username, workspace } = params;
  if (!username || !workspace) {
    return Response.json({ error: "Invalid parameters" }, { status: 400 });
  } else if (username !== user.nickname) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  const cleanedName = cleanName("UserName-" + username + "Repo-" + workspace);

  const gcpConfig = await getConfig();
  const instanceConfig = await {
    ...gcpConfig,
    instanceName: cleanName,
    username: username,
    workspace: workspace,
    userId: user.sid,
  };

  const filter = {
    username: instanceConfig.username,
    workspace: workspace,
  };

  await connectDB();
  const runningInstance = await Instance.findOne(filter);
  const lostInstance = await getInstance(cleanedName);

  if (!runningInstance && !lostInstance) {
    try {
      await createInstance(cleanedName, vmType);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const serverIP = await getInstanceIP(cleanedName);
      const gcpConfig = await getConfig();
      console.info(
        `Instance Created: ${cleanedName}, Server IP: ${serverIP}, Config: ${JSON.stringify(gcpConfig)}`
      );
      const instanceConfig = await {
        ...gcpConfig,
        instanceName: cleanedName,
        username: username,
        workspace: workspace,
        userId: user.sid,
        serverIP: serverIP,
      };
      const saved = await Instance.create(instanceConfig);
      await saved.save();
    } catch (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    redirect("/username/" + username + "/workspace/" + workspace + "/editor");
  }
  redirect("/username/" + username + "/workspace/" + workspace + "/editor");
}
