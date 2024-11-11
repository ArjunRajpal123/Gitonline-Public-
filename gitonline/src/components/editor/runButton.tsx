import Play from "../icons/play";

export default function RunButton({ runFunction }: { runFunction: Function }) {
  return (
    <button
      className="btn btn-square btn-sm bg-green-600"
      onClick={() => runFunction()}
    >
      <Play />
    </button>
  );
}
