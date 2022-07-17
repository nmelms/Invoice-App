import React from "react";
import plusImg from "../assets/icon-plus.svg";

export default function AddItemBtn({ handleAddClick }) {
  return (
    <div className="addItemBtn">
      <button type="button" onClick={() => handleAddClick()}>
        <img src={plusImg} /> Add New Item
      </button>
    </div>
  );
}
