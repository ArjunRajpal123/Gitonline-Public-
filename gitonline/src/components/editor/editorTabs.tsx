import React, { useEffect, memo } from "react";

import { useState } from "react";
import CloseButton from "../closeButton";
import BreadCrumbs from "./breadCrumbs";
import { EditorComponent, EditorContent } from "./editor";
import RunButton from "./runButton";
import SaveButton from "./saveButton";
import EmptyEditor from "./emptyEditor";

export type FileMeta = {
  relPath: string;
  name: string;
};

export type EditorTab = {
  tabs: FileMeta[];
  selectedTab: number;
};

export const EditorTabs = memo(function EditorTabs({
  tabs,
  code,
  codeEditFunction,
  removeTabs,
  saveFunction,
  handleTabChange,
}: {
  tabs: EditorTab;
  code: Array<EditorContent>;
  codeEditFunction: Function;
  removeTabs: Function;
  saveFunction: Function;
  handleTabChange: Function;
}) {
  const [editorTabs, setEditorTabs] = useState<EditorTab>(tabs);
  useEffect(() => {
    setEditorTabs(tabs);

  }, [code, tabs]);

  return (
    <div className="h-1/2">
      {editorTabs.tabs.length !== 0 ? (
        <>
          <div
            role="tablist"
            className="tabs tabs-lifted overflow-x-scroll overflow-y-clip"
          >
            {editorTabs.tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab overflow-y-clip"
                  aria-label={tab.name}
                  checked={index === editorTabs.selectedTab}
                  onChange={() => handleTabChange(index)}
                ></input>
                {index === editorTabs.selectedTab && (
                  <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 justify-end align-middle flex w-full"
                  >
                    <div className="tab-content w-full align-center flex justify-between">
                      <div className="flex">
                        <CloseButton handleClose={() => removeTabs(index)} />
                        <BreadCrumbs path={tab.relPath} />
                      </div>
                    </div>
                    <div className="flex gap-1 pl-1">
                      <SaveButton saveFunction={() => saveFunction(tab.relPath, code[index].code)} />
                      <RunButton runFunction={() => console.log("RUNNNING")} />
                    </div>
                    <EditorComponent
                  codeEdit={codeEditFunction}
                  initCode={code[index]}
                />
                  </div>
                  
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <EmptyEditor />
      )}
    </div>
  );
});
