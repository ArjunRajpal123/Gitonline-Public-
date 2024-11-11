"use client";

import { useEffect, useState } from "react";
import HomeNavbar from "@/components/homeNav";
import Loading from "@/components/loading";
import RepoCard from "@/components/repoCard";
import Footer from "@/components/footer";
import Accordian, { AccordianContent } from "@/components/accordian";
import { UserCard, UserCardProps } from "@/components/userCard";
import { useUser } from "@auth0/nextjs-auth0/client";


type repoInfo = {
  name: string;
  description: string;
  workspaceUrl: string;
  htmlUrl: string;
};

async function getRepos() {
  const gitUser = await fetch("/api/user");
  const gitUserJson = await gitUser.json();
  const gitRepos = await gitUserJson.repoList;
  for (let i = 0; i < gitRepos.length; i++) {
    const encodedLogin = encodeURIComponent(gitUserJson.username);
    const encodedRepoName = encodeURIComponent(gitRepos[i].name);
    gitRepos[i].htmlUrl = gitRepos[i].html_url;
    gitRepos[i].workspaceUrl =
      `/username/${encodedLogin}/workspace/${encodedRepoName}`;
  }
  gitUserJson.repoList = gitRepos;
  return gitUserJson;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function HomePage() {
  const [gitRepos, setGitRepos] = useState<repoInfo[]>([]);
  const [userInfo, setUserInfo] = useState<UserCardProps>({} as UserCardProps);
  const { user, error, isLoading } = useUser();



  const [isLoadingState, setLoadingState] = useState(isLoading);

  const content: AccordianContent[] = [
    {
      title: "Getting Started",
      content:
        "File Placement: Place the dependencies.yaml file in the root directory of your GitHub repository. This ensures that it is easily accessible and can be referenced by developers working on the project.\nFile Naming: Name the YAML file dependencies.yaml to maintain consistency and clarity within the project structure. \nInclude in Version Control: Make sure to include the dependencies.yaml file in your version control system (e.g., Git). This ensures that all contributors have access to the dependency specifications and can maintain consistency across development environments.\n Update and Maintain: Regularly update the dependencies.yaml file to reflect any changes in the project's dependencies. This ensures that all team members are aware of the required dependencies and their respective versions.",
    },
    {
      title: "Signing Up For Updates",
      content:
        "To be added - how to sign up for updates from the team! - coming soon!",
    },
    {
      title: "Latest Updates",
      content: "To be added - latest updates from the team!",
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getRepos().then((gitUserJson) => {
      setGitRepos(gitUserJson.repoList);
      setUserInfo({
        profileImg: gitUserJson.profileImg,
        username: gitUserJson.username,
        blog: gitUserJson.blog,
        bio: gitUserJson.bio,
        location: gitUserJson.location,
        followers: gitUserJson.followers,
        following: gitUserJson.following,
        repos: gitUserJson.repos,
      });
      setLoadingState(false);
    });
  }, []);

  if (isLoadingState) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main>
      <div className="bg-base-200">
        <HomeNavbar profileImg={user?.picture ?? ""} />
        <div className="m-auto items-center">
          <div className="grid grid-cols-12 gap-8 mx-8 mt-8 min-w-[1024px] max-w-[1660px]">
            <div className="col-span-6 flex flex-col gap-4 h-screen overflow-y-scroll">
              {gitRepos.map(
                (repo: {
                  name: string;
                  description: string;
                  workspaceUrl: string;
                  htmlUrl: string;
                }, index:number) => (
                  <RepoCard
                    name={repo.name}
                    description={repo.description}
                    workspaceUrl={repo.workspaceUrl}
                    htmlUrl={repo.htmlUrl}
                    key={index}
                  />
                )
              )}
              {gitRepos.map((repo: repoInfo, index: number) => (
                <RepoCard
                  name={repo.name}
                  description={repo.description}
                  workspaceUrl={repo.workspaceUrl}
                  htmlUrl={repo.htmlUrl}
                  key={index}
                />
              ))}
            </div>
            <div className="col-span-6 flex flex-col gap-4">
              <UserCard
                profileImg={userInfo.profileImg}
                username={userInfo.username}
                blog={userInfo.blog}
                bio={userInfo.bio}
                location={userInfo.location}
                followers={userInfo.followers}
                following={userInfo.following}
                repos={userInfo.repos}
              />
              <Accordian content={content} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
