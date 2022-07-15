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
      setColor("0,0,0");
    } else if (whichList[index].status === "pending") {
      setColor("51, 170, 51");
    } else {
      setColor("255,165,0");
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
      <div className="invoiceID">
        <p style={{ color: "gray" }}>#</p>
        {whichList[index].tag}
      </div>
      <div className="clientsName">
        <p style={{ color: "gray" }}>{whichList[index].clientsName}</p>
      </div>
      <div className="paymentDue">
        <p style={{ color: "gray" }}>due {whichList[index].dueDate}</p>
      </div>
      <div
        style={{
          fontStyle: "bold",
          background: `rgba(${color}, 0.1)`,
          color: `rgba(${color})`,
        }}
        className="status"
      >
        <p style={{ fontStyle: "bold" }}>{whichList[index].status}</p>
      </div>
      <div className="total">${total}</div>
    </div>
  );
}
