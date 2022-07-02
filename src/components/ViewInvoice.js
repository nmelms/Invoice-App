import React, { useContext, useState, useEffect } from "react";
import BackButton from "./BackButton";
import Alert from "./Alert";
import {
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import GlobalContext from "../GlobalContext";

export default function ViewInvoice({ setPage, page }) {
  const {
    itemId,
    list,
    setList,
    clickedIndex,
    itemsArr,
    fetchData,
    filteredList,
    setItem,
  } = useContext(GlobalContext);

  let grandTotal = 0;
  const [clickedItem, setClickedItem] = useState();
  const [alert, setAlert] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [total, setTotal] = useState(0);
  const [currentItem, setCurrentItem] = useState();
  const item = list.find((item) => item.id === itemId);

  const onDeleteClick = () => {
    setAlert(true);
  };

  useEffect(() => {
    if (userResponse === "yes") {
      console.log("yes");
      deleteDoc(doc(db, "form", item.id));
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

  let colRef = collection(db, "form");

  const handleStatusClick = async () => {
    if (item.status === "pending") {
      await updateDoc(doc(db, "form", item.id), {
        status: "complete",
      });
    } else if (item.status === "complete") {
      await updateDoc(doc(db, "form", item.id), {
        status: "pending",
      });
    }
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
          <p>#{item.id}</p>
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

        {item.items.map((item, index) => {
          item.total = item.qty * item.price;
          grandTotal += item.total;
          return (
            <div key={index} className="invoiceItems">
              <div>
                <h4>{item.itemName}</h4>
              </div>
              <div className="itemMultiply">
                <p>{item.qty} X... </p>
                <p>{item.price}</p>
              </div>
              <div className="itemTotal">{item.total}</div>
            </div>
          );
        })}

        <div className="grandTotal">
          <p>Grand Total</p>
          <p>{grandTotal}</p>
        </div>

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
