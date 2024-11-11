export const maxDuration = 25;
import {
  cleanName,
} from "@/app/utils/gcloud";
import { Instance } from "@/app/utils/models";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import connectDB from "@/app/utils/db";


export async function GET(
  request: Request,
  { params }: { params: { username: string; workspace: string } }
) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  await connectDB();
  const { username, workspace } = params;
  const cleanedName = cleanName("UserName-" + username + "Repo-" + workspace);
  console.log(cleanedName);
  const repoInfo = await Instance.findOne({
    instanceName: cleanedName,
  });
  if (repoInfo === null) {
    return Response.json({ error: "No instance found" }, { status: 404 });
  } else {
    return Response.json(repoInfo);
  }
}
