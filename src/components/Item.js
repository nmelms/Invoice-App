import React, { useEffect, useState, useRef } from "react";

export default function Item({
  defaultName,
  defaultQty,
  defaultPrice,
  onChange,
  total,
  id,
}) {
  const qtyRef = useRef(0);
  const priceRef = useRef(0);

  console.log("itemrender");
  return (
    <div className="Item">
      <div className="itemName">
        <label htmlFor="itemName">Item Name</label>
        <input
          defaultValue={defaultName}
          onChange={(e) => onChange(e, id)}
          className="input"
          type="text"
          id="itemName"
        />
      </div>
      <div className="qty">
        <label htmlFor="qty">Qty.</label>
        <input
          ref={qtyRef}
          defaultValue={defaultQty}
          onChange={(e) => onChange(e, id)}
          className="input"
          type="text"
          id="qty"
        />
      </div>
      <div className="price">
        <label htmlFor="price">Price</label>
        <input
          ref={priceRef}
          defaultValue={defaultPrice}
          onChange={(e) => onChange(e, id)}
          className="input"
          type="text"
          id="price"
        />
      </div>
      <div className="total">
        <p>total</p>
        <p>{total}</p>
      </div>
      <div className="itemDelete">
        <p>x</p>
      </div>
    </div>
  );
}
