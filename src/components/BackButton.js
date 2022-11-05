import React, { useContext } from "react";
import backArrow from "../assets/icon-arrow-left.svg";

export default function BackButton({ action, name }) {
  return (
    <button onClick={() => action()} className="BackButton">
      <div c>
        <img style={{ width: "40px", height: "50px" }} src={backArrow} />
      </div>
      <h3>Go back</h3>
    </button>
  );
}
