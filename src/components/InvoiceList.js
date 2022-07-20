import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import Invoice from "./Invoice.js";
import data from "../data/data.json";
import empty from "../assets/illustration-empty.svg";

export default function InvoiceList({ setPage, page, filterBy }) {
  const { list, loading, setClickedIndex, filter } = useContext(GlobalContext);
  let filteredList = [];
  let grandTotal = 0;

  filter != ""
    ? (filteredList = list.filter((item) => item.status === filter))
    : (filteredList = list);

  return (
    <div>
      {filteredList.length === 0 && (
        <div className="emptyImgDiv">
          <img src={empty} />
          <h3>there is nothing here</h3>
          <p>Click the new button to create a new invoice</p>
        </div>
      )}
      {loading && <h1>loading...</h1>}
      {!loading &&
        filteredList.map((item, index) => {
          return (
            <Invoice
              index={index}
              whichList={filteredList}
              key={item.id}
              setPage={setPage}
              page={page}
              id={item.id}
            />
          );
        })}
    </div>
  );
}
