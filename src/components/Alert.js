import React from "react";

export default function Alert({ setUserResponse }) {
  return (
    <div className="Alert">
      <p>Are you sure you want to delete this invoice?</p>
      <button onClick={() => setUserResponse("yes")}>yes</button>
      <button onClick={() => setUserResponse("no")}>no</button>
    </div>
  );
}
