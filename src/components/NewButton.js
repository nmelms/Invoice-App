import React from "react";
import plusIcon from "../assets/icon-plus.svg";

export default function NewButton({ setPage }) {
  return (
    <button onClick={() => setPage("newInvoice")} className="NewButton">
      <div className="plusIcon">
        <img className="plusIconImg" src={plusIcon} />
      </div>
      <div className="newButtonText">
        <h4>New</h4>
      </div>
    </button>
  );
}
