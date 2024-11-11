export const dynamic = 'force-dynamic';
import connectDB from '../../utils/db';
import { User } from "../../utils/models";
import { getSession } from '@auth0/nextjs-auth0';


export async function GET() {
    const session = await getSession();
    if (!session) {
       return Response.redirect("/api/auth/login");
    }
    await connectDB();
    const userProfile = session?.user;
    const loginId = userProfile?.sub?.replace("github|", "");
    console.log(loginId);
    const gitUser = await User.findOne({ id: loginId });
    if (!gitUser) {
        return Response.json({ message: "User not found" });
    }

    const gitRepoUrl = await gitUser?.repos_url;
    const gitReposReq = await fetch(gitRepoUrl!);
    const gitRepos = await gitReposReq.json();
    for (let i = 0; i < gitRepos.length; i++) {
        const login = gitUser?.login;
        const encodedLogin = encodeURIComponent(login!);
        const encodedRepoName = encodeURIComponent(gitRepos[i].name);
        gitRepos[
            i
        ].workspaceUrl = `/username/${encodedLogin}/workspace/${encodedRepoName}`;
    }

    const userInfo = {
        repoList: gitRepos,
        profileImg: gitUser!.avatar_url,
        username: gitUser!.login,
        name: gitUser!.name,
        bio: gitUser!.bio,
        followers: gitUser!.followers,
        following: gitUser!.following,
        repos: gitUser!.public_repos,
        blog: gitUser!.blog,
    };

    return Response.json(userInfo);
}
    
