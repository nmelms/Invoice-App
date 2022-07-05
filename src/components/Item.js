import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState, useRef } from "react";
let total = 0;

export default function Item({
  defaultName,
  defaultQty,
  setItemsArr,
  defaultPrice,
  itemsArr,
  onChange,
  total,
  setCurrentItems,
  currentItems,
  index,
  id,
}) {
  const qtyRef = useRef(0);
  const priceRef = useRef(0);

  const handleDeleteClick = (e) => {
    let newArr = currentItems.filter((item) => item.id !== id);
    console.log(newArr);
    setCurrentItems(newArr);
  };

  return (
    <div className="Item">
      <div className="itemName">
        <label htmlFor="itemName">Item Name</label>
        <input
          value={defaultName}
          onChange={(e) => onChange(e, index)}
          className="input"
          type="text"
          id="itemName"
        />
      </div>
      <div className="qty">
        <label htmlFor="qty">Qty.</label>
        <input
          ref={qtyRef}
          value={defaultQty}
          onChange={(e) => onChange(e, index)}
          className="input"
          type="text"
          id="qty"
        />
      </div>
      <div className="price">
        <label htmlFor="price">Price</label>
        <input
          ref={priceRef}
          value={defaultPrice}
          onChange={(e) => onChange(e, index)}
          className="input"
          type="text"
          id="price"
        />
      </div>
      <div className="total">
        <p>total</p>
        <p>{total}</p>
      </div>
      <button onClick={(e) => handleDeleteClick(e)} className="itemDelete">
        <h3>x</h3>
      </button>
    </div>
  );
}
