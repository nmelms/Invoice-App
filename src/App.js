import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home.js";
import NewInvoice from "./components/NewInvoice.js";
import NavBar from "./components/NavBar.js";
import EditInvoice from "./components/EditInvoice.js";
import Login from "./components/Login.js";
import InvoiceTitle from "./components/InvoiceTitle.js";
import Filter from "./components/Filter.js";
import NewButton from "./components/NewButton.js";
import InvoiceList from "./components/InvoiceList.js";
import BackButton from "./components/BackButton.js";
import AddressForm from "./components/AddressForm.js";
import Item from "./components/Item.js";
import { db } from "./firebase";
import ViewInvoice from "./components/ViewInvoice.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import GlobalContext from "./GlobalContext.js";
import { GlobalProvider } from "./GlobalContext";
import Register from "./components/Register.js";

function App() {
  const [page, setPage] = useState("login");

  const appHeight = () =>
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <GlobalProvider>
      <div className="App">
        {page === "home" && <Home page={page} setPage={setPage} />}
        {page === "newInvoice" && <NewInvoice page={page} setPage={setPage} />}
        {page === "viewInvoice" && (
          <ViewInvoice page={page} setPage={setPage} />
        )}
        {page === "editInvoice" && <EditInvoice setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "register" && <Register setPage={setPage} />}
      </div>
    </GlobalProvider>
  );
}

export default App;
