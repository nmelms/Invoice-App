import React, { useContext, useState, useEffect } from "react";
import NavBar from "./NavBar";
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
    alertRef,
  } = useContext(GlobalContext);

  let grandTotal = 0;
  const [clickedItem, setClickedItem] = useState();
  const [alert, setAlert] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [total, setTotal] = useState(0);
  const [currentItem, setCurrentItem] = useState();
  const item = list.find((item) => item.id === itemId);
  const current = new Date(item.invoiceDate);
  current.setDate(current.getDate() + Number(item.paymentTerms));
  item.dueDate = current.toDateString().split(" ").splice(1).join(" ");

  const onDeleteClick = () => {
    console.log(alert);
    setAlert(true);
  };
  const [color, setColor] = useState("");
  useEffect(() => {
    if (item.status === "draft") {
      setColor("0,0,0");
    } else if (item.status === "pending") {
      setColor("51, 170, 51");
    } else {
      setColor("255,165,0");
    }
  });

  useEffect(() => {
    console.log(alert);
    if (userResponse === "yes") {
      console.log("yes");
      deleteDoc(doc(db, "form", item.id));
      setUserResponse("");
      setPage("home");
      setAlert(false);
    } else if (userResponse === "no") {
      console.log("no");
      document.querySelector(".Alert").style.display = "hidden";
      setUserResponse("");
    }
    setAlert(false);
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
    <div className="viewInvoice">
      <NavBar />
      <BackButton setPage={setPage} name="home" />
      {alert && <Alert setUserResponse={setUserResponse} />}
      <div className="invoiceStatus ">
        <p>status</p>
        <p
          className="status"
          style={{
            fontStyle: "bold",
            background: `rgba(${color}, 0.1)`,
            color: `rgba(${color})`,
            marginBottom: "1rem",
          }}
        >
          {item.status}
        </p>
      </div>

      <div className="viewInvoiceBody">
        <div className="tagAndProdDes">
          <h4>#{item.tag}</h4>
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
          <div className="invoiceDate">
            <p>invoice Date</p>
            <h4>{item.invoiceDate}</h4>
          </div>
          <div className="billToAddress">
            <p>bill To</p>
            <h4>{item.clientsName}</h4>
            <p>{item.cstreet}</p>
            <p>{item.ccity}</p>
            <p>{item.cstate}</p>
            <p>{item.czip}</p>
            <p>{item.ccountry}</p>
          </div>
          <div>
            <p className="paymentDueP">Payment Due</p>
            <h4>{item.dueDate}</h4>
          </div>
        </div>
        <div className="sentTo">
          <p>Sent To</p>
          <h4>{item.clientsEmail}</h4>
        </div>
        <div className="invoiceItemsWrapper">
          {item.items.map((item, index) => {
            item.total = item.qty * item.price;
            grandTotal += item.total;
            return (
              <div key={index} className="invoiceItems">
                <div className="invoiceItemName">
                  <h4>{item.itemName}</h4>
                </div>
                <div className="itemMultiply">
                  <p>{item.qty} X... </p>
                  <p>{item.price}</p>
                </div>
                <div className="invoiceItemTotal">{item.total}</div>
              </div>
            );
          })}
        </div>

        <div className="grandTotal">
          <p>Grand Total</p>
          <h2>${grandTotal}</h2>
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
