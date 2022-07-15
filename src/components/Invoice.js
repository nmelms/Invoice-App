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
    status,
    setClickedIndex,
    data,
    paymentTerms,
    item,
    setItem,
  } = useContext(GlobalContext);
  const [color, setColor] = useState("");
  useEffect(() => {
    if (whichList[index].status === "draft") {
      setColor("gray");
    } else if (whichList[index].status === "pending") {
      setColor("green");
    }
  }, []);

  console.log(color);
  // const current = new Date(list[index].invoiceDate);
  const [updatedDate, setUpdatedDate] = useState();
  let total = 0;
  const handleClick = (e) => {
    setPage("viewInvoice");
    let newList = [...list];
    let newArr = newList.filter((item) => {
      return item.id === id;
    });
    setItemId(id);
  };
  whichList[index].items.map((item) => {
    total += item.total;
  });

  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{whichList[index].tag}</div>
      <div className="clientsName">{whichList[index].clientsName}</div>
      <div className="paymentDue">due {whichList[index].dueDate}</div>
      <div style={{ background: color }} className="status">
        {whichList[index].status}
      </div>
      <div className="total">{total}</div>
    </div>
  );
}
