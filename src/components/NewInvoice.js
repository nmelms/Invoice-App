import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  forceUpdate,
} from "react";

import BackButton from "./BackButton.js";
import NavBar from "./NavBar.js";
import AddressForm from "./AddressForm";
import BillTo from "./BillTo.js";
import { db } from "../firebase";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import Item from "./Item.js";
import GlobalContext from "../GlobalContext";
import { Formik } from "formik";

export default function NewInvoice({ setPage }) {
  const {
    clientFormRef,
    dueDate,
    formRef,
    setColor,
    currentItems,
    setCurrentItems,
    formik,
    list,
    itemsArr,
    itemName,
    makeId,
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

  useEffect(() => {
    let tag = makeId();
    formik.values.tag = tag;
  }, []);

  const itemRef = useRef([]);

  const handleDraftClick = () => {
    formik.values.status = "draft";
    formik.values.items = currentItems;
    const dbRef = doc(collection(db, "form"));
    setDoc(dbRef, formik.values);
    setItemsArr([]);
    formik.handleReset();
    formRef.current.reset();
    clientFormRef.current.reset();
  };

  useEffect(() => {
    formik.handleReset();
    setItemsArr([]);
    setCurrentItems([]);
  }, []);

  const handleAddClick = () => {
    let newArray = [...currentItems];
    newArray.push({
      itemName: "",
      qty: 0,
      price: 0,
      id: Math.random(),
    });
    setCurrentItems(newArray);
  };

  const handleDeleteClick = (e, id) => {
    console.log(id);
    let newArr = currentItems.filter((item) => item.id != id);
    console.log(newArr);
    setCurrentItems(newArr);
  };

  const onChange = (e, index) => {
    let value = e.target.value;
    let id = e.target.id;
    let name = "";
    let newArr = [...currentItems];
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
    setCurrentItems(newArr);
  };

  return (
    <div>
      <NavBar />
      <BackButton setPage={setPage} name="home" />
      <h1>New Invoice</h1>
      <h3>{formik.values.tag}</h3>
      <p>bill from</p>
      <Formik
        initialValues={{
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
        }}
        onSubmit={(values, { resetForm }) => {
          const dbRef = doc(collection(db, "form"));

          values.items = currentItems;
          values.dueDate = dueDate;
          values.tag = makeId();
          let current = new Date(values.invoiceDate);
          current.setDate(current.getDate() + Number(values.paymentTerms));
          let newDueDate = current
            .toDateString()
            .split(" ")
            .splice(1)
            .join(" ");
          values.dueDate = newDueDate;
          setDoc(dbRef, values);
          resetForm();
        }}
        validate={(values) => {
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
        }}
      >
        {(props, isValid, submitCount) => (
          <form
            ref={formRef}
            onSubmit={props.handleSubmit}
            className="AddressForm"
          >
            <div className="street">
              <label htmlFor="street">Street Address:</label>
              <input
                name="street"
                value={props.values.street}
                className="input"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                id="street"
              />
            </div>
            <div className="city">
              <label htmlFor="city">City:</label>
              <input
                value={props.values.city}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="city"
                className="input"
                type="text"
                id="city"
              />
            </div>
            <div className="state">
              <label htmlFor="state">State:</label>
              <input
                value={props.values.state}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="state"
                className="input"
                type="text"
                id="state"
              />
            </div>
            <div className="zip">
              <label htmlFor="zip">Zip:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.zip}
                onBlur={props.handleBlur}
                name="zip"
                type="text"
                id="zip"
              />
            </div>
            <div className="country">
              <label htmlFor="country">Country:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.country}
                onBlur={props.handleBlur}
                name="country"
                type="text"
                id="country"
              />
            </div>

            <p>bill to</p>

            <div className="clientsName">
              <label htmlFor="clientsName">Clients Name:</label>
              <input
                onChange={props.handleChange}
                value={props.values.clientsName}
                name="clientsName"
                type="text"
                id="clientsName"
              />
            </div>
            <div className="clientsEmail">
              <label htmlFor="clientsEmail">Clients Email:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.clientsEmail}
                name="clientsEmail"
                type="text"
                id="clientsEmail"
              />
            </div>
            <div className="street">
              <label htmlFor="cstreet">Street Address:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.cstreet}
                name="cstreet"
                id="cstreet"
              />
            </div>
            <div className="city">
              <label htmlFor="ccity">City:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.ccity}
                name="ccity"
                type="text"
                id="ccity"
              />
            </div>
            <div className="state">
              <label htmlFor="cstate">State:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.cstate}
                name="cstate"
                type="text"
                id="cstate"
              />
            </div>
            <div className="zip">
              <label htmlFor="czip">Zip:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.czip}
                name="czip"
                type="text"
                id="czip"
              />
            </div>
            <div className="country">
              <label htmlFor="ccountry">Country:</label>
              <input
                className="input"
                onChange={props.handleChange}
                value={props.values.ccountry}
                name="ccountry"
                type="text"
                id="ccountry"
              />
            </div>
            <div className="bottomInvoice">
              <div className="invoiceDate">
                <label htmlFor="invoiceDate">Invoice Date:</label>
                <input
                  className="input"
                  onChange={props.handleChange}
                  value={props.values.invoiceDate}
                  name="invoiceDate"
                  type="date"
                  id="invoiceDate"
                />
              </div>
              <div className="paymentTerms">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <select
                  onChange={props.handleChange}
                  value={props.values.paymentTerms}
                  name="paymentTerms"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>
              <div className="productDescription">
                <label htmlFor="productDescription">Product Description:</label>
                <input
                  className="input"
                  onChange={props.handleChange}
                  value={props.values.prodDes}
                  name="prodDes"
                  type="text"
                  id="productDescription"
                />
              </div>
            </div>

            {!props.isValid && props.submitCount > 0 && (
              <div className="alert alert-danger">
                all fields must be complete in order to submit. Try saving as
                draft
              </div>
            )}

            <button onClick={() => handleAddClick()}>add item</button>
            <button type="submit">submit</button>
            <button onClick={() => handleDraftClick()}>save as Draft</button>
          </form>
        )}
      </Formik>

      <h2>itemList</h2>
      {currentItems.map((item, index) => {
        return (
          <Item
            id={item.id}
            total={item.total}
            index={index}
            key={index}
            onChange={onChange}
            defaultName={item.itemName}
            defaultQty={item.qty}
            defaultPrice={item.price}
            setItemName={setItemName}
            setQty={setQty}
            setPrice={setPrice}
            itemsArr={itemsArr}
            handleDeleteClick={handleDeleteClick}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
          />
        );
      })}
    </div>
  );
}
