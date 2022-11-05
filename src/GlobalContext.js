import { createContext, useState, useEffect, useRef } from "react";
import { useFormik, Formik } from "formik";
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
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
  const [grandTotal, setGrandTotal] = useState(0);
  const [itemId, setItemId] = useState();
  const [filter, setFilter] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [itemTag, setItemTag] = useState("");
  const [dataId, setDataId] = useState(" ");
  const [userId, setUserId] = useState("form");
  const alertRef = useRef();
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const clientFormRef = useRef(null);
  const formRef = useRef(null);
  let dataRef = collection(db, userId);

  // useEffect(() => {
  //   // let dataRef = collection(db, newUser);
  // }, [newUser]);

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      tag: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      clientsName: "",
      clientsEmail: "",
      cstreet: "",
      ccity: "",
      cstate: "",
      czip: "",
      ccountry: "",
      invoiceDate: "",
      paymentTerms: "30",
      prodDes: "",
      dueDate: "",
      items: currentItems,
      status: "pending",
      timeStamp: serverTimestamp(),
    },

    onSubmit: (values) => {
      const dbRef = doc(collection(db, "form"));
      // formRef.current.reset();
      // clientFormRef.current.reset();
      values.items = currentItems;
      values.dueDate = dueDate;
      values.tag = makeId();
      let current = new Date(values.invoiceDate);
      current.setDate(current.getDate() + Number(values.paymentTerms));
      let newDueDate = current.toDateString().split(" ").splice(1).join(" ");
      values.dueDate = newDueDate;
      setDoc(dbRef, values);
    },

    validate: (values) => {
      let errors = {};

      if (!values.street) {
        errors.street = "required";
      }
      if (!values.city) {
        errors.city = "required";
      }
      if (!values.state) {
        errors.state = "required";
      }
      if (!values.zip) {
        errors.zip = "required";
      }
      if (!values.country) {
        errors.country = "required";
      }
      if (!values.clientsName) {
        errors.clientsName = "required";
      }
      if (!values.clientsEmail) {
        errors.clientsEmail = "required";
      }
      if (!values.cstreet) {
        errors.cstreet = "required";
      }
      if (!values.ccity) {
        errors.ccity = "required";
      }
      if (!values.cstate) {
        errors.cstate = "required";
      }
      if (!values.czip) {
        errors.czip = "required";
      }
      if (!values.ccountry) {
        errors.ccountry = "required";
      }
      if (!values.invoiceDate) {
        errors.invoiceDate = "required";
      }
      if (!values.paymentTerms) {
        errors.paymentTerms = "required";
      }
      if (!values.prodDes) {
        errors.prodDes = "required";
      }

      return errors;
    },
  });

  const makeId = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;

    for (var i = 0; i < 2; i++) {
      result += characters
        .charAt(Math.floor(Math.random() * charactersLength))
        .toUpperCase();
    }

    for (var i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    }

    return result;
  };

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
    onSnapshot(query(dataRef, orderBy("timeStamp")), (snapshot) => {
      setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        itemTag,
        setItemTag,
        clientFormRef,
        formRef,
        makeId,
        formik,
        itemId,
        setItemId,
        filter,
        setFilter,
        // item,
        // setItem,
        city,
        country,
        grandTotal,
        setGrandTotal,
        clientsName,
        clientsEmail,
        cZip,
        setList,
        cCountry,
        prodDes,
        invoiceDate,
        setItemsArr,
        items,
        cStreet,
        state,
        zip,
        cCity,
        // fetchData,
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
        alertRef,
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
        currentItems,
        setCurrentItems,
        // filteredList,
        // setFilteredList,
        dataRef,
        data,
        showNewInvoice,
        setShowNewInvoice,
        showEditInvoice,
        setShowEditInvoice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
