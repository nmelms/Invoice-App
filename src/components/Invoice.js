import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, collection, updateDoc } from "firebase/firestore";
import GlobalContext from "../GlobalContext.js";
import { useContext } from "react";

export default function Invoice({ setPage, index, page }) {
  const {
    item,
    fetchData,
    paymentDue,
    list,
    clickedIndex,
    clientName,
    total,
    status,
    setClickedIndex,
    data,
    paymentTerms,
  } = useContext(GlobalContext);
  const current = new Date(list[index].invoiceDate);
  const [updatedDate, setUpdatedDate] = useState();

  const handleClick = (e) => {
    setPage("viewInvoice");
    console.log(page);
    setClickedIndex(index);
  };

  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{index}</div>
      <div className="clientsName">{list[index].clientsName}</div>
      <div className="paymentDue">due {list[index].dueDate}</div>
      <div style={{ border: "2px solid black" }} className="status">
        {list[index].status}
      </div>
      <div className="total">{total}</div>
    </div>
  );
}
