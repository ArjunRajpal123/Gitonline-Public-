import { useCallback, useEffect, useState } from "react";
import { FileTree, TreeNode } from "./fileTree";
import Loading from "../loading";

export default async function ExploreContainer({
  addTab,
  username,
  workspace,
}: {
  addTab: Function;
  username: string;
  workspace: string;
}) {
  const [loading, setLoading] = useState(true);
  const [usernameCurr] = useState(username);
  const [workspaceCurr] = useState(workspace);
  const [directory, setDirectory] = useState<TreeNode>({
    type: "directory",
    name: "root",
    contents: [],
    path: ".",
  });

  const addPathToTree = useCallback((tree: TreeNode, path = ""): TreeNode => {
    return {
      ...tree,
      path: path + "/" + tree.name,
      contents: tree.contents?.map((subTree: TreeNode) =>
        addPathToTree(subTree, path + "/" + tree.name)
      ),
    };
  },[]);

  const getDirectory = useCallback(async () => {
    const response = await fetch(`https://vmbackend-2gsvl2tzbq-ue.a.run.app/username/${usernameCurr}/workspace/${workspaceCurr}/listFiles`);
    const data = await response.json();
    const currentTree = addPathToTree(data[0].contents[0]);
    setDirectory(currentTree);
    setLoading(false);
  }, [addPathToTree, setDirectory, usernameCurr, workspaceCurr]);

  useEffect(() => {
    getDirectory();
  }, [getDirectory, usernameCurr, workspaceCurr]);

  return (
    <div className="max-h-[60vh] bg-base-200 overflow-y-scroll">
      <div className="flex justify-end p-2 bg-base-300 text-center">
        <button onClick={() => getDirectory()}>
          <svg
            className="btn btn-circle btn-md"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>
        </button>
      </div>
      {loading ? <Loading /> : <FileTree node={directory!} addTab={addTab} />}
    </div>
  );
}
