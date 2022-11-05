import React, { useEffect, useState, useRef } from "react";
import trashCan from "../assets/icon-delete.svg";
let total = 0;

export default function Item({
  defaultName,
  defaultQty,
  defaultPrice,
  onChange,
  total,
  handleDeleteClick,
  index,
  id,
}) {
  const qtyRef = useRef(0);
  const priceRef = useRef(0);

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
      <div className="itemTotal">
        <p>total</p>
        <p className="itemTotal input">${total}</p>
      </div>
      <button onClick={(e) => handleDeleteClick(e, id)} className="itemDelete">
        <img src={trashCan} />
      </button>
    </div>
  );
}
