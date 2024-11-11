// eslint-disable-next-line no-dupe-args

import CreateModal from "./createModal";

export default function RepoCard({
  name,
  description,
  workspaceUrl,
  htmlUrl,
  key,
}: {
  name: string;
  description: string;
  workspaceUrl: string;
  htmlUrl: string;
  key: number;
}) {
  return (
    <div className="card card-side bg-base-100 shadow-xl max-w-[700px] max-h-72">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="w-96 h-32">{description}</p>
        <div className="card-actions justify-end">
          <CreateModal workspaceUrl={workspaceUrl} id={name + "-key-"+ key}/>
          <a href={htmlUrl}>
            <button className="btn btn-secondary text-white">Github</button>
          </a>
        </div>
      </div>
    </div>
  );
}
