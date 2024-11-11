import File from "../icons/file";

export default function SaveButton({
  saveFunction,
}: {
  saveFunction: Function;
}) {
  return (
    <button
      className="btn btn-square btn-sm bg-primary"
      onClick={() => saveFunction()}
    >
      <File />
    </button>
  );
}
