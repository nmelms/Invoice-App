import React, { useRef, useState, useEffect } from "react";

export default function FormAlert({
  alertRef,
  setShowAlert,
  isValid,
  submitCount,
  showAlert,
}) {
  // const [showAlert, setShowAlert] = useState(false);

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div ref={alertRef} className="alert-danger">
      all fields must be complete in order to submit. Try saving as draft
    </div>
  );
}
