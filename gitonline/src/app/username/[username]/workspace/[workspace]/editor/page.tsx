"use client";
import { useCallback, useEffect, useState } from "react";
import HomeNavbar from "@/components/homeNav";
import Loading from "@/components/loading";
import { useUser } from "@auth0/nextjs-auth0/client";
import { EditorContent } from "@/components/editor/editor";
import { TerminalTab } from "@/components/editor/terminal";
import ExploreContainer from "@/components/editor/exploreContainer";
import {
  EditorTab,
  EditorTabs,
  FileMeta,
} from "@/components/editor/editorTabs";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Page({
  params,
}: {
  params: { username: string; workspace: string };
}) {
  const { user, error, isLoading } = useUser();
  const [isLoadingState, setLoadingState] = useState(isLoading);
  const [code, setCode] = useState<Array<EditorContent>>([]);
  const [editorTabs, setEditorTabs] = useState<EditorTab>({
    tabs: [],
    selectedTab: 0,
  });

  const { username, workspace } = params;

  const removeTabs = useCallback(
    (index: number) => {
      if (index >= code.length || index < 0) {
        return;
      } else if (code.length <= 1) {
        setEditorTabs({
          tabs: [],
          selectedTab: 0,
        });
        setCode([]);
      } else {
        setEditorTabs((prevTabs) => ({
          tabs: prevTabs.tabs.filter((_, i) => i !== index),
          selectedTab:
            prevTabs.selectedTab >= index
              ? prevTabs.selectedTab === 0
                ? prevTabs.selectedTab
                : prevTabs.selectedTab - 1
              : prevTabs.selectedTab - 1,
        }));
        setCode((prevCode) => prevCode.filter((_, i) => i !== index));
      }
    },
    [setEditorTabs, setCode, code]
  );

  const handleTabChange = useCallback(
    (index: number) => {
      try {
        setEditorTabs((prevState) => ({
          tabs: prevState.tabs,
          selectedTab: index,
        }));
      } catch (error) {
        console.error("Failed to change tab", error);
      }
    },
    [setEditorTabs]
  );

  const saveCode = useCallback(async (pathExt: string, code:string) => {
    try {
      const path =
        `https://vmbackend-2gsvl2tzbq-ue.a.run.app/username/${username}/workspace/${workspace}/uploadFile` + pathExt;
      await fetch(path, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
    } catch (error) {
      console.error("Failed to save", error);
    }
  }, []);

  const editText = useCallback(
    (newCode: string) => {
      setCode((prevCode) =>
        prevCode.map((code, i) =>
          i === editorTabs.selectedTab ? { ...code, code: newCode } : code
        )
      );
    },
    [editorTabs, setCode]
  );

  const addTab = useCallback(
    async (newEditor: FileMeta) => {
      try {
        const path =
          `https://vmbackend-2gsvl2tzbq-ue.a.run.app/username/${username}/workspace/${workspace}/filePath` +
          newEditor.relPath;
        const response = await fetch(path, {
          method: "GET",
          mode: "cors",
        });
        const type = await response.headers.get("content-type");
        const code = await response.text();
        const newContent: EditorContent = {
          code: await code,
          type: type ?? "text",
          relPath: newEditor.relPath,
        };
        setCode((prevCode) => [...prevCode, newContent]);
      } catch (error) {
        console.error("Failed to fetch", error);
      }

      try {
        setEditorTabs((prevTabs) => ({
          tabs: [...prevTabs.tabs, newEditor],
          selectedTab: prevTabs.tabs.length,
        }));
      } catch (error) {
        console.error("Failed to add tab", error);
      }
    },
    [setEditorTabs]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch(`/api/username/${username}/workspace/${workspace}/get`).then(
      async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        setLoadingState(false);
      }
    );
  }, [username, workspace]);

  if (isLoadingState) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main>
      <div className="bg-base-100 h-full">
        <HomeNavbar profileImg={user?.picture ?? ""} />
        <div className="flex flex-row min-h-screen min-w-screen bg-base-200">
          <div className="w-1/2 h-full max-h-full">
            <EditorTabs
              tabs={editorTabs}
              code={code}
              codeEditFunction={editText}
              saveFunction={saveCode}
              removeTabs={removeTabs}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="w-1/2">
            <TerminalTab username={username} workspace={workspace} />
            <div className="h-[50vh]">
              <ExploreContainer
                addTab={addTab}
                username={username}
                workspace={workspace}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
