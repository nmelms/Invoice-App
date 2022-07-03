import React, { useContext } from "react";
import GlobalContext from "../GlobalContext";

export default function InvoiceTitle() {
  const { list, filter } = useContext(GlobalContext);
  let filteredList = [];
  filter != ""
    ? (filteredList = list.filter((item) => item.status === filter))
    : (filteredList = list);

  return (
    <div className="InvoiceTitle">
      <h1>INVOCIES</h1>
      {filteredList.length === 0 && <p>No Invoices</p>}
      {filteredList.length === 1 && <p>1 invoice</p>}
      {filteredList.length >= 2 && <p>{filteredList.length} invoices</p>}

      {/* {filteredList.length === 0 ? (
        <p>No Invoices</p>
      ) : (
        filteredList.length + "Invoices"
      )} */}
    </div>
  );
}
