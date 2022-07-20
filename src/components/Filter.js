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
    } else if (filter === "Pending") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "Pending";
      });
      setFilter("Pending");
      setFilteredList(newArr);
    } else if (filter === "Complete") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "Complete";
      });
      setFilter("Complete");
      setFilteredList(newArr);
    } else if (filter === "Draft") {
      const newArr = [...list];
      newArr.filter((item) => {
        return item.status === "Draft";
      });
      setFilter("Draft");
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
      <button className="filterBtn">
        <h2>Filter</h2>
        <div className="downSVG">
          <img src={downArrow} />
        </div>
      </button>
      <div className="dropDownContent">
        <div className="filterLink" onClick={() => filterClick("Complete")}>
          Complete
        </div>

        <div className="filterLink" onClick={() => filterClick("Pending")}>
          Pending
        </div>
        <div className="filterLink" onClick={() => filterClick("Draft")}>
          Draft
        </div>
        <div className="filterLink" onClick={() => filterClick("")}>
          All
        </div>
      </div>
    </div>
  );
}
