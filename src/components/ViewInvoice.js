import React, { useContext, useState, useEffect } from "react";
import BackButton from "./BackButton";
import Alert from "./Alert";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import GlobalContext from "../GlobalContext";

export default function ViewInvoice({ setPage }) {
  const { list, clickedIndex, fetchData } = useContext(GlobalContext);
  const [alert, setAlert] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const item = list[clickedIndex];

  const onDeleteClick = () => {
    setAlert(true);
  };

  useEffect(() => {
    if (userResponse === "yes") {
      console.log("yes");
      deleteDoc(doc(db, "form", list[clickedIndex].id));
      setUserResponse("");
      setPage("home");
    } else if (userResponse === "no") {
      document.querySelector(".Alert").remove();
      setUserResponse("");
    }
  }, [userResponse]);

  const handleEditClick = () => {
    setPage("editInvoice");
  };
  const handleStatusClick = async () => {
    if (list[clickedIndex].status === "pending") {
      await updateDoc(doc(db, "form", `${list[clickedIndex].id}`), {
        status: "complete",
      });
    } else {
      await updateDoc(doc(db, "form", `${list[clickedIndex].id}`), {
        status: "pending",
      });
    }
    fetchData();
  };

  return (
    <div>
      <BackButton setPage={setPage} name="home" />
      {alert && <Alert setUserResponse={setUserResponse} />}
      <div className="invoiceStatus">
        <p>status</p>
        <p>{item.status}</p>
      </div>

      <div>
        <div>
          <p>#{clickedIndex}</p>
          <p>{item.prodDes}</p>
        </div>
        <div className="senderAddress">
          <p>{item.street}</p>
          <p>{item.city}</p>
          <p>{item.state}</p>
          <p>{item.zip}</p>
          <p>{item.country}</p>
        </div>
        <div className="invoiceBillTo">
          <div>
            <p>invoice Date</p>
            <h4>{item.invoiceDate}</h4>
          </div>
          <div className="billToAddress">
            <p>bill To</p>
            <h4>{item.clientsName}</h4>
            <p>{item.cStreet}</p>
            <p>{item.cCity}</p>
            <p>{item.cState}</p>
            <p>{item.cZip}</p>
            <p>{item.cCountry}</p>
          </div>
          <div>
            <p>Payment Due</p>
            <h4>{item.dueDate}</h4>
          </div>
        </div>
        <div>
          <p>Sent To</p>
          <h4>{item.clientsEmail}</h4>
        </div>

        {list[clickedIndex].items.map((item, index) => {
          return (
            <div key={index} className="invoiceItems">
              <div>
                <h4>{item.itemName}</h4>
              </div>
              <div className="itemMultiply">
                <p>{item.qty} X... </p>
                <p>{item.price}</p>
              </div>
              <div className="itemTotal">{`${item.qty * item.price}`}</div>
            </div>
          );
        })}

        <div className=""></div>
        <div className="viewInvoiceButtons">
          <button onClick={() => handleEditClick()}>edit</button>
          <button onClick={() => onDeleteClick()}>delete</button>
          <button onClick={() => handleStatusClick()}>mark as paid</button>
        </div>
      </div>
    </div>
  );
}
