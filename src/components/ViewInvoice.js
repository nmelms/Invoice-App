import React, { useContext, useState, useEffect } from "react";
import NavBar from "./NavBar";
import BackButton from "./BackButton";
import EditInvoice from "./EditInvoice";
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
    setItemTag,
    setShowEditInvoice,
    showEditInvoice,
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
  setItemTag(item.tag);
  console.log(showEditInvoice);

  const onDeleteClick = () => {
    console.log(alert);
    setAlert(true);
  };
  const [color, setColor] = useState("");
  useEffect(() => {
    if (item.status === "Draft") {
      setColor("0,0,0");
    } else if (item.status === "Pending") {
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
    console.log("working");
    setShowEditInvoice(true);
    console.log(showEditInvoice);
  };

  const action = () => {
    setShowEditInvoice(false);
  };

  let colRef = collection(db, "form");

  const handleStatusClick = async () => {
    console.log("click");
    if (item.status === "Pending") {
      await updateDoc(doc(db, "form", item.id), {
        status: "Complete",
      });
    } else if (item.status === "Complete") {
      await updateDoc(doc(db, "form", item.id), {
        status: "Pending",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="mainContent">
        <BackButton action={() => setPage("home")} />
        <div className="viewInvoice">
          {alert && <Alert setUserResponse={setUserResponse} />}

          <div className="invoiceStatus ">
            <div className="statusAndName">
              <p>status</p>
              <p
                className="status"
                style={{
                  fontStyle: "bold",
                  background: `rgba(${color}, 0.1)`,
                  color: `rgba(${color})`,
                }}
              >
                {item.status}
              </p>
            </div>

            <div className="invoiceStatusButtons">
              <button className="editBtn" onClick={() => handleEditClick()}>
                <h4>edit</h4>
              </button>
              <button className="deleteBtn" onClick={() => onDeleteClick()}>
                <h4>delete</h4>
              </button>
              <button className="paidBtn" onClick={() => handleStatusClick()}>
                <h4>mark as paid</h4>
              </button>
            </div>
          </div>

          <div className="viewInvoiceBody">
            <div className="tagAndProdDes">
              <h4>
                <h4 style={{ color: "#7E88C3" }}>#</h4>
                {item.tag}
              </h4>
              <p>{item.prodDes}</p>
            </div>
            <div className="senderAddress">
              <p>{item.street}</p>
              <p>{item.city}</p>
              <p>{item.state}</p>
              <p>{item.zip}</p>
              <p>{item.country}</p>
            </div>

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
            <div className="paymentDue">
              <p className="paymentDueP">Payment Due</p>
              <h4>{item.dueDate}</h4>
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
                      <p>
                        {item.qty} X ${item.price}
                      </p>
                    </div>
                    <div className="invoiceItemTotal">${item.total}</div>
                  </div>
                );
              })}
            </div>

            <div className="grandTotal">
              <p>Grand Total</p>
              <h2>${grandTotal}</h2>
            </div>

            <div className="viewInvoiceButtons">
              <button className="editBtn" onClick={() => handleEditClick()}>
                <h4>edit</h4>
              </button>
              <button className="deleteBtn" onClick={() => onDeleteClick()}>
                <h4>delete</h4>
              </button>
              <button className="paidBtn" onClick={() => handleStatusClick()}>
                <h4>mark as paid</h4>
              </button>
            </div>
          </div>
          {showEditInvoice && (
            <div className="background">
              <EditInvoice action={action} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
