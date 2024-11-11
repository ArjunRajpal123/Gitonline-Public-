import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "./xterm.css";

const initTerminal = () => {
  const element = document.getElementById("terminal")!;

  const webSocket = new WebSocket(
    "ws://" + window.location.host + window.location.pathname + "/console"
  );
  webSocket.onmessage = (event) => {
    term.write(event.data);
  };
  var term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(element);

  var entries: string[] = [];
  var currPos = 0;
  let myBuffer: string[] = [];

  term.onKey(async (e: { key: string; domEvent: KeyboardEvent }) => {
    if (e.domEvent.code === "Enter") {
      webSocket.send(myBuffer.join(""));
      myBuffer = [];
      currPos++;
    } else if (e.domEvent.code === "Backspace") {
      if (myBuffer.length > 0) {
        myBuffer.pop();
        term.write("\b \b");
      }
    } else if (
      (e.domEvent.ctrlKey || e.domEvent.metaKey) &&
      e.domEvent.key === "v"
    ) {
      myBuffer.push(await navigator.clipboard.readText());
      term.write(myBuffer.join(""));
    } else {
      term.write(e.key);
      myBuffer.push(e.key);
    }
  });
};

export default initTerminal;
