import React, { useEffect, memo } from "react";

import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "../../../public/xterm.css";

const initTerminal = (username: string, workspace: string) => {
  const element = document.getElementById("terminal_1")!;
  const webSocket = new WebSocket(
    "wss://vmbackend-2gsvl2tzbq-ww.a.run.app/username/" +
      username +
      "/" +
      "workspace" +
      "/" +
      workspace +
      "/console"
  );
  const term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(element);

  webSocket.onmessage = (event) => {
    term.write(event.data);
  };

  let myBuffer: string[] = [];

  term.onKey(async (e: { key: string; domEvent: KeyboardEvent }) => {
    if (e.domEvent.code === "Enter") {
      webSocket.send(myBuffer.join(""));
      myBuffer = [];
    } else if (e.domEvent.code === "Backspace") {
      if (myBuffer.length > 0) {
        myBuffer.pop();
        term.write("\b \b");
      }
    } else if (
      e.domEvent.ctrlKey &&
      e.domEvent.code === "KeyV" &&
      e.domEvent.type === "keydown"
    ) {
      myBuffer.push(await navigator.clipboard.readText());
      term.write(myBuffer.join(""));
    } else {
      term.write(e.key);
      myBuffer.push(e.key);
    }
  });
};

export const TerminalTab = memo(function TerminalTab({
  username,
  workspace,
}: {
  username: string;
  workspace: string;
}) {
  useEffect(() => {
    initTerminal(username, workspace);
  }, [username, workspace]);

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  return (
    <div
      id="terminal_1"
      className="h-[50vh] w-[50vw] bg-black overflow-y-scroll focus:scroll-auto"
    />
  );
});
