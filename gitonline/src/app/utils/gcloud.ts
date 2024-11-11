import compute from "@google-cloud/compute";
import creds from '../../../gcpConfig/application_default_credentials.json';
const projectId = "personal-404218";
const zone = "us-central1-c";
let machineType = "n1-standard-1";
const sourceImage = "projects/debian-cloud/global/images/family/debian-10";
const networkName = "global/networks/default";

export const getFullConfig = () => {
  return {
    projectId,
    zone,
    machineType,
    sourceImage,
    networkName,
  };
};

export const getConfig = () => {
  return {
    zone,
    machineType,
    sourceImage,
    networkName,
  };
};

export const cleanName = (instanceName: string) => {
  // Convert to lowercase
  instanceName = instanceName.toLowerCase();
  instanceName = instanceName.replace(/[^a-z0-9-]/g, "-");
  if (!/^[a-z]/.test(instanceName)) {
    instanceName = "a" + instanceName.substring(1);
  }
  if (/-$/.test(instanceName)) {
    instanceName = instanceName.slice(0, -1) + "a";
  }
  return instanceName;
};

export const getInstance = async (instanceName: string) => {
  const instancesClient = new compute.InstancesClient({credential:creds});
  try {
    await instancesClient.get({
      project: projectId,
      zone,
      instance: instanceName,
    });
    console.log(`Instance exists - Name:${instanceName}`);
    return true;
  } catch {
    console.log(`Instance donsn't exists - Name:${instanceName}`);
    return false;
  }
};



export const getInstanceIP = async (instanceName: string) => {
  instanceName = cleanName(instanceName);
  const instancesClient = new compute.InstancesClient({credential:creds});
  const constInstanceData = await instancesClient.get({
    project: projectId,
    zone,
    instance: instanceName,
  });
  console.log(`Instance created: ${instanceName}`);

  const ip = constInstanceData[0]?.networkInterfaces?.[0]?.accessConfigs?.[0]?.natIP ?? '';
  return ip;
};

// Create a new instance with the values provided above in the specified project and zone.
export const createInstance = async (instanceName: string, instanceType: string) => {
  instanceName = cleanName(instanceName);
  machineType = instanceType;
  console.log(`Creating the ${instanceName} instance...`);
  console.log(`Zone: ${zone}`);

  const instancesClient = await new compute.InstancesClient({credential:creds});

  const [response] = await instancesClient.insert({
    instanceResource: {
      name: instanceName,
      disks: [
        {
          // Describe the size and source image of the boot disk to attach to the instance.
          initializeParams: {
            diskSizeGb: "10",
            sourceImage,
          },
          autoDelete: true,
          boot: true,
          type: "PERSISTENT",
        },
      ],
      machineType: `zones/${zone}/machineTypes/${machineType}`,
      networkInterfaces: [
        {
          network: "global/networks/default",
          accessConfigs: [
            {
              name: "External NAT",
              type: "ONE_TO_ONE_NAT",
            },
          ],
        },
      ],
    },
    project: projectId,
    zone,
  });

  if (response === null || response === undefined) {
    return null;
  }

  return await getInstanceIP(instanceName);
};

export const deleteInstance = async (instanceName: string) => {
  instanceName = cleanName(instanceName);
  const instancesClient = new compute.InstancesClient({credential:creds});

  console.log(`Deleting the ${instanceName} instance...`);
  const [deleteResponse] = await instancesClient.delete({
    project: projectId,
    zone,
    instance: instanceName,
  });
  console.log(deleteResponse);
};

export default { createInstance };

// const sshTest = (ip) => {
//   const conn = new Client();
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   conn
//     .on("ready", () => {
//       console.log("Client :: ready");
//       conn.shell((err, stream) => {
//         if (err) throw err;
//         stream
//           .on("close", () => {
//             console.log("Stream :: close");
//             conn.end();
//             rl.close();
//           })
//           .on("data", (data) => {
//             console.log("OUTPUT: " + data);
//           });

//         rl.on("line", (input) => {
//           stream.write(input + "\n");
//         });
//       });
//     })
//     .connect({
//       //'104.197.76.20'
//       host: ip,
//       username: "arjunrajpal1234",
//       privateKey: readFileSync("/home/node/.ssh/gcloud"),
//     });
// };
