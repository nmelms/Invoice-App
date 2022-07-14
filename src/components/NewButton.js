import React from "react";
import plusIcon from "../assets/icon-plus.svg";

export default function NewButton({ setPage }) {
  return (
    <button onClick={() => setPage("newInvoice")} className="NewButton">
      <div className="plusIcon">
        <img className="plusIconImg" src={plusIcon} />
      </div>
      <div className="newButtonText">
        <p>New</p>
      </div>
    </button>
  );
}
