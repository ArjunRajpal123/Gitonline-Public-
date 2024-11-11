/* eslint-disable @next/next/no-img-element */


import LinkedIn from "./SocialButtons/linkedIn";

export type UserCardProps = {
    profileImg: string;
    username: string;
    blog: string;
    bio: string;
    location: string;
    followers: number;
    following: number;
    repos: number;
  }

export function UserCard({
  profileImg,
  username,
  blog,
  bio,
  location,
  followers,
  following,
  repos,
}: UserCardProps) {
  return (
    <div className="flex flex-row rounded-lg bg-base-100 shadow-lg h-36">
      <div className="flex grow p-4 w-max self-stretch">
        <div className="avatar flex">
          <div className="w-24 h-24 rounded">
            <img src={profileImg} />
          </div>
        </div>
        <div className="flex flex-col grow pl-4">
          <div className="text-lg font-bold">{username}</div>
          <LinkedIn url={blog}/>
          <div className="text-sm text-base-content">{bio}</div>
          <div className="text-sm text-base-content">{location}</div>
          <div className="flex flex-row join">
            <div className="btn join-item">{followers} followers</div>
            <div className="btn join-item">{following} following</div>
            <div className="btn join-item">{repos} repos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
