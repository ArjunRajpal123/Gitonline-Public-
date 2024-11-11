"use client";
import React, { useState } from "react";

export default function FeedbackModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feature, setFeature] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feature, message }),
    });

    if (response.ok) {
      console.log("Feedback submitted");
    } else {
      console.log("Feedback failed to submit");
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("feedback-modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        Submit an Issue
      </button>
      <dialog id="feedback-modal" className="modal h-fit">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Feedback</h3>
          <div className="modal-action">
            <form
              method="dialog"
              onSubmit={handleSubmit}
              className="bg-white rounded-xl w-full p-6 space-y-4 flex flex-col"
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
              />
              <input
                type="text"
                placeholder="Feature"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="input input-bordered"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea textarea-bordered"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="modal-action w-full">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
