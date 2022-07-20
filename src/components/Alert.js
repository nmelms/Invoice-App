import React, { useContext } from "react";
import GlobalContext from "../GlobalContext";

export default function Alert({ setUserResponse }) {
  const { alertRef, itemTag } = useContext(GlobalContext);
  return (
    <div className="alertBackground">
      <div ref={alertRef} className="Alert">
        <h3>Confirm Deletion</h3>

        <p>
          Are you sure you want to delete invoice {itemTag}? This action cannot
          be undone.
        </p>
        <div className="alertBtns">
          <button
            className="alertCancelBtn"
            onClick={() => setUserResponse("no")}
          >
            Cancel
          </button>
          <button
            className="alertDeleteBtn"
            onClick={() => setUserResponse("yes")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
