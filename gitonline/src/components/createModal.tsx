import React, { useState } from "react";

export default function CreateModal({
  workspaceUrl,
  id,
}: {
  workspaceUrl: string;
  id: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (document.getElementById(id) as HTMLDialogElement).showModal()
        }
      >
        Enter Workspace
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select Your Desired VM</h3>
          <form
            className="flex flex-col gap-4"
            action={"/api" + workspaceUrl + "/create"}
            method="POST"
          >
            <select name="vmType" className="select w-full">
              <optgroup label="Medium traffic web and application servers">
                <option value="n1-standard-1">
                  N1 (&quot;n1-standard-1&quot;)
                </option>
              </optgroup>
            </select>
            {submitted === true ? (
              <button className="btn">
                <span className="loading loading-spinner"></span>
                Creating VM Instance
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => setSubmitted(true)}
                className="btn"
              >
                Create Workspace
              </button>
            )}
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
