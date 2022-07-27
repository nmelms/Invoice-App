import React, { useContext } from "react";
import plusIcon from "../assets/icon-plus.svg";
import GlobalContext from "../GlobalContext";

export default function NewButton({ setPage }) {
  const { setShowNewInvoice } = useContext(GlobalContext);
  return (
    <button onClick={() => setShowNewInvoice(true)} className="NewButton">
      <div className="plusIcon">
        <img className="plusIconImg" src={plusIcon} />
      </div>
      <div className="newButtonText">
        <h4>New</h4>
      </div>
    </button>
  );
}
