import React, { useEffect, useState, memo } from "react";

import { Editor } from "@monaco-editor/react";

export type EditorContent = {
  code: string;
  type: string;
  relPath: string;
};

export const EditorComponent = memo(function EditorComponent({
  initCode,
  codeEdit,
}: {
  initCode: EditorContent;
  codeEdit: Function;
}) {
  const [currentCode, setCurrentCode] = useState<string>("");

  useEffect(() => {
    if (initCode !== undefined) {
      setCurrentCode(initCode.code);
    }
  }, []);

  return (
    <div onBlur={() => codeEdit(currentCode)}>
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        defaultValue={currentCode}
        onChange={(value) => {
          setCurrentCode(value as string);
        }}
      />
    </div>
  );
});
