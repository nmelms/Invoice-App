import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  forceUpdate,
} from "react";
import { useFormik } from "formik";
import BackButton from "./BackButton.js";
import NavBar from "./NavBar.js";
import AddressForm from "./AddressForm";
import BillTo from "./BillTo.js";
import { db } from "../firebase";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import Item from "./Item.js";
import GlobalContext from "../GlobalContext";

export default function NewInvoice({ setPage }) {
  const {
    list,
    itemsArr,
    itemName,
    qty,
    price,
    setIndexer,
    setItemIndex,
    setItemsArr,
    setItemName,
    setQty,
    setPrice,
    indexer,
    grandTotal,
    setGrandTotal,
  } = useContext(GlobalContext);
  // const [data, setData] = useState({
  //   street: "",
  //   indexer: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   country: "",
  //   clientsName: "",
  //   clientsEmail: "",
  //   cStreet: "",
  //   cCity: "",
  //   cState: "",
  //   cZip: "",
  //   cCountry: "",
  //   userData: "",
  //   itemName: "",
  //   qty: "",
  //   price: "",
  //   dueDate: "",
  //   invoiceDate: "",
  //   paymentTerms: "",
  //   prodDes: "",
  //   status: "pending",
  //   items: itemsArr,
  //   timeStamp: serverTimestamp(),
  // });

  const formik = useFormik({
    initialValues: {
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
      paymentTerms: "",
      prodDes: "",
      items: itemsArr,
      status: "pending",
      timeStamp: serverTimestamp(),
    },

    onSubmit: (values) => {
      const dbRef = doc(collection(db, "form"));
      console.log(itemsArr);
      values.items = itemsArr;
      setDoc(dbRef, values);
      formRef.current.reset();
      clientFormRef.current.reset();
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
  const formRef = useRef([]);
  const itemRef = useRef([]);
  const clientFormRef = useRef([]);

  const handleDraftClick = () => {
    console.log(itemsArr);
    formik.values.status = "draft";
    formik.values.items = itemsArr;
    const dbRef = doc(collection(db, "form"));
    setDoc(dbRef, formik.values);
    setItemsArr([]);
    formRef.current.reset();
    clientFormRef.current.reset();
  };

  useEffect(() => {
    setItemsArr([]);
  }, []);

  const handleAddClick = () => {
    let newArray = [...itemsArr];
    newArray.push({
      itemName: "",
      qty: 0,
      price: 0,
    });
    setItemsArr(newArray);
  };

  const onChange = (e, index) => {
    let value = e.target.value;
    let id = e.target.id;
    let name = "";
    let newArr = [...itemsArr];
    let item = newArr[index];
    if (id === "itemName") {
      setItemName(value);
      item.itemName = value;
    } else if (id === "qty") {
      setQty(value);
      item.qty = value;
    } else {
      setPrice(value);
      item.price = value;
    }
    let total = item.price * item.qty;
    item.total = total;
    item.key = index;
    newArr[index] = item;
    console.log(newArr);
    setItemsArr(newArr);
    console.log(itemsArr);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIndexer(indexer + 1);
  //   const dbRef = doc(collection(db, "form"));
  //   data.items = itemsArr;
  //   setDoc(dbRef, data);
  //   formRef.current.reset();
  //   clientFormRef.current.reset();
  // };

  return (
    <div>
      <NavBar />
      <BackButton setPage={setPage} name="home" />
      <h1>New Invoice</h1>
      <p>bill from</p>
      <form ref={formRef} className="AddressForm">
        <div className="street">
          <label htmlFor="street">Street Address:</label>
          <input
            name="street"
            value={formik.values.street}
            className="input"
            onChange={formik.handleChange}
            type="text"
            id="street"
          />
          {formik.errors.street ? <div>{formik.errors.street}</div> : null}
        </div>
        <div className="city">
          <label htmlFor="city">City:</label>
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            className="input"
            type="text"
            id="city"
          />
          {formik.errors.city ? <div>{formik.errors.city}</div> : null}
        </div>
        <div className="state">
          <label htmlFor="state">State:</label>
          <input
            value={formik.values.state}
            onChange={formik.handleChange}
            name="state"
            className="input"
            type="text"
            id="state"
          />
          {formik.errors.state ? <div>{formik.errors.state}</div> : null}
        </div>
        <div className="zip">
          <label htmlFor="zip">Zip:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.zip}
            name="zip"
            type="text"
            id="zip"
          />
          {formik.errors.zip ? <div>{formik.errors.zip}</div> : null}
        </div>
        <div className="country">
          <label htmlFor="country">Country:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.country}
            name="country"
            type="text"
            id="country"
          />
          {formik.errors.country ? <div>{formik.errors.country}</div> : null}
        </div>
      </form>

      <p>bill to</p>

      <form ref={clientFormRef} className="AddressForm">
        <div className="clientsName">
          <label htmlFor="clientsName">Clients Name:</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.clientsName}
            name="clientsName"
            type="text"
            id="clientsName"
          />
          {formik.errors.clientsName ? (
            <div>{formik.errors.clientsName}</div>
          ) : null}
        </div>
        <div className="clientsEmail">
          <label htmlFor="clientsEmail">Clients Email:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.clientsEmail}
            name="clientsEmail"
            type="text"
            id="clientsEmail"
          />
          {formik.errors.clientsEmail ? (
            <div>{formik.errors.clientsEmail}</div>
          ) : null}
        </div>
        <div className="street">
          <label htmlFor="cStreet">Street Address:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.cstreet}
            name="cstreet"
            id="cstreet"
          />
          {formik.errors.cstreet ? <div>{formik.errors.cstreet}</div> : null}
        </div>
        <div className="city">
          <label htmlFor="ccity">City:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.ccity}
            name="ccity"
            type="text"
            id="ccity"
          />
          {formik.errors.ccity ? <div>{formik.errors.ccity}</div> : null}
        </div>
        <div className="state">
          <label htmlFor="cstate">State:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.cstate}
            name="cstate"
            type="text"
            id="cstate"
          />
          {formik.errors.cstate ? <div>{formik.errors.cstate}</div> : null}
        </div>
        <div className="zip">
          <label htmlFor="czip">Zip:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.czip}
            name="czip"
            type="text"
            id="czip"
          />
          {formik.errors.czip ? <div>{formik.errors.czip}</div> : null}
        </div>
        <div className="country">
          <label htmlFor="ccountry">Country:</label>
          <input
            className="input"
            onChange={formik.handleChange}
            value={formik.values.ccountry}
            name="ccountry"
            type="text"
            id="ccountry"
          />
          {formik.errors.ccountry ? <div>{formik.errors.ccountry}</div> : null}
        </div>
        <div className="bottomInvoice">
          <div className="invoiceDate">
            <label htmlFor="invoiceDate">Invoice Date:</label>
            <input
              className="input"
              onChange={formik.handleChange}
              value={formik.values.invoiceDate}
              name="invoiceDate"
              type="date"
              id="invoiceDate"
            />
            {formik.errors.invoiceDate ? (
              <div>{formik.errors.invoiceDate}</div>
            ) : null}
          </div>
          <div className="paymentTerms">
            <label htmlFor="paymentTerms">Payment Terms:</label>
            <select
              onChange={formik.handleChange}
              value={formik.values.paymentTerms}
              name="paymentTerms"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
            {formik.errors.paymentTerms ? (
              <div>{formik.errors.paymentTerms}</div>
            ) : null}
          </div>
          <div className="productDescription">
            <label htmlFor="productDescription">Product Description:</label>
            <input
              className="input"
              onChange={formik.handleChange}
              value={formik.values.prodDes}
              name="prodDes"
              type="text"
              id="productDescription"
            />
            {formik.errors.prodDes ? <div>{formik.errors.prodDes}</div> : null}
          </div>
        </div>
      </form>
      <h2>itemList</h2>
      {itemsArr.map((item, index) => {
        return (
          <Item
            total={item.total}
            index={index}
            key={index}
            onChange={onChange}
            defaultName={""}
            defaultQty={0}
            defaultPrice={0}
            setItemName={setItemName}
            setQty={setQty}
            setPrice={setPrice}
            itemsArr={itemsArr}
            setItemsArr={setItemsArr}
          />
        );
      })}

      <button onClick={() => handleAddClick()}>add item</button>
      <input type="submit" onClick={formik.handleSubmit} />
      <button onClick={() => handleDraftClick()}>save as Draft</button>
    </div>
  );
}
