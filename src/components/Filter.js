import React, { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import downArrow from "../assets/icon-arrow-down.svg";

export default function Filter({ setFilterBy, filteredList, setFilteredList }) {
  const { list, setList, fetchData, filter, setFilter, item } =
    useContext(GlobalContext);

  useEffect(() => {
    if (filter === "none") {
      setFilter("none");
      setList(list);
    } else if (filter === "pending") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "pending";
      });
      setFilter("pending");
      setFilteredList(newArr);
    } else if (filter === "complete") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "complete";
      });
      setFilter("complete");
      setFilteredList(newArr);
    } else if (filter === "draft") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "draft";
      });
      setFilter("draft");
      setFilteredList(newArr);
    }
  }, [list]);

  const filterClick = (filterString) => {
    setFilter(filterString);
    // console.log("fetch");
    // const newArr = [...list];
    // if (filterString != "") {
    //   const filteredList = newArr.filter((item) => {
    //     return item.status === `${filterString}`;
    //   });
    //   setFilter(`${filterString}`);
    //   setFilterBy(filterString);
    //   setFilteredList(filteredList);
    //   console.log(filteredList);
    // } else {
    //   setFilter("none");
    //   setFilterBy("");
    //   setFilteredList(list);
    //   console.log("second");
    // }
  };

  return (
    <div className="Filter">
      <h1>filter</h1>
      <button onClick={() => filterClick("complete")}>complete</button>
      <button onClick={() => filterClick("")}>none</button>
      <button onClick={() => filterClick("pending")}>pendingz</button>
      <button onClick={() => filterClick("draft")}>draft</button>
      <img style={{ transform: "scale(.8)" }} src={downArrow} />
    </div>
  );
}
