import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import NavBar from "./NavBar";
import InvoiceTitle from "./InvoiceTitle";
import Filter from "./Filter";
import NewButton from "./NewButton";
import InvoiceList from "./InvoiceList";

export default function Home({ setPage, page }) {
  const {
    fetchData,
    setClickedIndex,
    loading,
    list,
    clickedIndex,
    setItem,
    item,
  } = useContext(GlobalContext);
  useEffect(() => {
    // fetchData();
  }, []);

  const [filterBy, setFilterBy] = useState("");
  const [filteredList, setFilteredList] = useState([...list]);

  return (
    <>
      <NavBar />
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
    </>
  );
}
