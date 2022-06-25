import { createContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase.js";
const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [clientsName, setClientsName] = useState("");
  const [clientsEmail, setClientsEmail] = useState("");
  const [cStreet, setCStreet] = useState("");
  const [cCity, setCCity] = useState("");
  const [cState, setCState] = useState("");
  const [cZip, setCZip] = useState("");
  const [cCountry, setCCountry] = useState("");
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState("");
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [prodDes, setProdDes] = useState("");
  const [status, setStatus] = useState("pending");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsArr, setItemsArr] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [clickedIndex, setClickedIndex] = useState();
  const [indexer, setIndexer] = useState(0);

  const dataRef = collection(db, "form");
  const current = new Date(invoiceDate);

  const data = {
    street,
    indexer,
    city,
    state,
    zip,
    country,
    clientsName,
    clientsEmail,
    cStreet,
    cCity,
    cState,
    cZip,
    cCountry,
    items,
    userData,
    itemName,
    qty,
    price,
    dueDate,
    invoiceDate,
    paymentTerms,
    prodDes,
    status,
    items: itemsArr,
    timeStamp: serverTimestamp(),
  };

  useEffect(() => {
    console.log(data);
  }, [street]);

  const fetchData = async () => {
    const data = await getDocs(query(dataRef, orderBy("timeStamp")));
    setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
    console.log(data.docs);
  };

  useEffect(() => {
    current.setDate(current.getDate() + Number(paymentTerms));
    setDueDate(current.toDateString().split(" ").splice(1).join(" "));
  });

  return (
    <GlobalContext.Provider
      value={{
        city,
        items,
        fetchData,
        indexer,
        setIndexer,
        itemsArr,
        itemName,
        qty,
        price,
        list,
        paymentTerms,
        setItemsArr,
        setItemName,
        setQty,
        setPrice,
        setStreet,
        setCity,
        setState,
        setZip,
        street,
        setCountry,
        setClientsName,
        clickedIndex,
        loading,
        setClickedIndex,
        setClientsEmail,
        setCStreet,
        setCState,
        setCCity,
        setCZip,
        setCCountry,
        setInvoiceDate,
        setPaymentTerms,
        setProdDes,
        data,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
