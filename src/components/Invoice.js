import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, collection, updateDoc } from "firebase/firestore";
import GlobalContext from "../GlobalContext.js";
import { useContext } from "react";

export default function Invoice({ setPage, index, page, id, whichList }) {
  const {
    setItemId,
    filteredList,
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
    item,
    setItem,
  } = useContext(GlobalContext);
  // const current = new Date(list[index].invoiceDate);
  const [updatedDate, setUpdatedDate] = useState();

  const handleClick = (e) => {
    setPage("viewInvoice");
    let newList = [...list];
    let newArr = newList.filter((item) => {
      return item.id === id;
    });
    setItemId(id);
  };

  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{index}</div>
      <div className="clientsName">{whichList[index].clientsName}</div>
      <div className="paymentDue">due {whichList[index].dueDate}</div>
      <div style={{ border: "2px solid black" }} className="status">
        {whichList[index].status}
      </div>
      <div className="total">{total}</div>
    </div>
  );
}
