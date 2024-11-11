"use server";

import { Session, handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { redirect } from 'next/navigation';
import { User } from "../../../utils/models";
import connectDB from "@/app/utils/db";
import { NextRequest } from "next/server";


const afterCallback = async (req: NextRequest, session: Session) => {
  await connectDB();
  if (session?.user) {
    const userProfile = session?.user;
    const loginId = userProfile?.sub.replace("github|", "");
    const users = await User.findOne({ id: loginId });

    if (users === null) {
      const userInfoReq = await fetch(
        "https://api.github.com/users/" + userProfile?.nickname
      );
      const gitUser = await userInfoReq.json();
      const user = new User(gitUser);
      await user.save();
    }
    return session;
  } else {
    redirect("/");
  }


};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
  login: handleLogin({
    returnTo: "/home"
  }),
});
