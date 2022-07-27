import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import NavBar from "./NavBar";
import InvoiceTitle from "./InvoiceTitle";
import Filter from "./Filter";
import NewButton from "./NewButton";
import NewInvoice from "./NewInvoice";
import InvoiceList from "./InvoiceList";
import EditInvoice from "./EditInvoice";

export default function Home({ setPage, page }) {
  const {
    fetchData,
    setClickedIndex,
    loading,
    list,
    clickedIndex,
    setItem,
    item,
    showNewInvoice,
    setShowNewInvoice,
    showEditInvoice,
  } = useContext(GlobalContext);
  useEffect(() => {
    // fetchData();
  }, []);

  const [filterBy, setFilterBy] = useState("");
  const [filteredList, setFilteredList] = useState([...list]);
  const action = () => {
    setShowNewInvoice(false);
  };

  return (
    <div className="homePage">
      <NavBar />
      <div className="mainContent">
        <div className="homeHeader">
          <InvoiceTitle list={list} />
          <Filter setFilteredList={setFilteredList} setFilterBy={setFilterBy} />
          <NewButton setPage={setPage} />
        </div>
        <InvoiceList
          filteredList={filteredList}
          filterBy={filterBy}
          page={page}
          setPage={setPage}
        />
      </div>

      {showNewInvoice && (
        <div className="background">
          <NewInvoice action={action} />
        </div>
      )}
    </div>
  );
}
