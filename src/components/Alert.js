import React, { useContext } from "react";
import GlobalContext from "../GlobalContext";

export default function Alert({ setUserResponse }) {
  const { alertRef } = useContext(GlobalContext);
  return (
    <div ref={alertRef} className="Alert">
      <p>Are you sure you want to delete this invoice?</p>
      <button onClick={() => setUserResponse("yes")}>yes</button>
      <button onClick={() => setUserResponse("no")}>no</button>
    </div>
  );
}
