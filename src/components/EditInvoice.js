import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import BackButton from "./BackButton";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { useFormik } from "formik";
import Item from "./Item.js";
import "../index.css";

export default function EditInvoice({ setPage }) {
  const [currentItems, setCurrentItems] = useState([]);
  const {
    formik,
    city,
    items,
    data,
    fetchData,
    itemIndex,
    itemName,
    list,
    qty,
    setItemIndex,
    price,
    setItemName,
    setQty,
    setPrice,
    setStreet,
    cStreet,
    cCity,
    setCity,
    setState,
    setZip,
    setCountry,
    setClientsName,
    setCState,
    setClientsEmail,
    setCStreet,
    setCCity,
    setCZip,
    setCCountry,
    setInvoiceDate,
    clickedIndex,
    street,
    setPaymentTerms,
    setIndexer,
    setProdDes,
    state,
    zip,
    country,
    clientsName,
    clientsEmail,
    cZip,
    cCountry,
    paymentTerms,
    prodDes,
    setList,
    invoiceDate,
    setGrandTotal,
    grandTotal,
    itemId,
  } = useContext(GlobalContext);
  const item = list.find((item) => item.id === itemId);
  const itemsArr = item.items;
  const itemRef = doc(db, "form", `${item.id}`);

  const formik2 = useFormik({
    initialValues: {
      street: item.street,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
      clientsName: item.clientsName,
      clientsEmail: item.clientsEmail,
      cstreet: item.cstreet,
      ccity: item.ccity,
      cstate: item.cstate,
      czip: item.czip,
      ccountry: item.ccountry,
      invoiceDate: item.invoiceDate,
      paymentTerms: item.paymentTerms,
      prodDes: item.prodDes,
      items: currentItems,
      status: "pending",
    },

    onSubmit: (values) => {
      const dbRef = doc(db, "form", item.id);
      values.items = currentItems;
      updateDoc(dbRef, values);
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

  useEffect(() => {
    // formik2.setFieldValue("street", item.street);
    // formik2.setFieldValue("city", item.city);
    // formik2.setFieldValue("state", item.state);
    // formik2.setFieldValue("zip", item.zip);
    // formik2.setFieldValue("country", item.country);
    // formik2.setFieldValue("clientsName", item.clientsName);
    // formik2.setFieldValue("clientsEmail", item.clientsEmail);
    // formik2.setFieldValue("cstreet", item.cstreet);
    // formik2.setFieldValue("ccity", item.ccity);
    // formik2.setFieldValue("cstate", item.cstate);
    // formik2.setFieldValue("czip", item.czip);
    // formik2.setFieldValue("paymentTerms", item.paymentTerms);
    // formik2.setFieldValue("prodDes", item.prodDes);
    // formik2.setFieldValue("invoiceDate", item.invoiceDate);
    // formik2.setFieldValue("city", item.city);
    // setIndexer(item.indexer);
    setCurrentItems(itemsArr);
  }, []);

  const handleSave = async () => {
    formik2.validateForm();
    formik2.isValid ? console.log("valid") : console.log("false");
  };

  const handleCancel = () => {
    formik2.setFieldValue("street", item.street);
    formik2.setFieldValue("city", item.city);
    formik2.setFieldValue("state", item.state);
    formik2.setFieldValue("zip", item.zip);
    formik2.setFieldValue("country", item.country);
    formik2.setFieldValue("clientsName", item.clientsName);
    formik2.setFieldValue("clientsEmail", item.clientsEmail);
    formik2.setFieldValue("cstreet", item.cstreet);
    formik2.setFieldValue("ccity", item.ccity);
    formik2.setFieldValue("cstate", item.cstate);
    formik2.setFieldValue("czip", item.czip);
    formik2.setFieldValue("paymentTerms", item.paymentTerms);
    formik2.setFieldValue("prodDes", item.prodDes);
    formik2.setFieldValue("invoiceDate", item.invoiceDate);
    formik2.setFieldValue("city", item.city);
    // setIndexer(item.indexer);
    setCurrentItems(itemsArr);
  };
  const handleDeleteClick = (e, id) => {
    let newArr = itemsArr.filter((item) => item.id != id);
    updateDoc(itemRef, { items: newArr });
  };

  const handleAddClick = async () => {
    let index = 0;
    let newArr = [...itemsArr];
    newArr.push({
      index: index,
      itemName: "",
      qty: 0,
      price: 0,
      id: Math.random(),
    });

    updateDoc(itemRef, {
      items: newArr,
    });

    index++;
  };

  const onChange = async (e, index) => {
    let value = e.target.value;
    let id = e.target.id;
    let name = "";
    let currentItem = itemsArr[index];
    if (id === "itemName") {
      currentItem.itemName = value;
      updateDoc(itemRef, { items: itemsArr });
    } else if (id === "qty") {
      currentItem.qty = value;
      updateDoc(itemRef, { items: itemsArr });
    } else {
      currentItem.price = value;
      updateDoc(itemRef, { items: itemsArr });
    }
    let total = currentItem.qty * currentItem.price;
    currentItem.total = total;
    updateDoc(itemRef, { items: itemsArr });
    setCurrentItems();
  };

  return (
    <div>
      <BackButton setPage={setPage} name="viewInvoice" />
      <h1>Edit Invoice</h1>
      <p>bill from</p>
      <form /*ref={formRef}*/ className="AddressForm">
        <div className="street">
          <label htmlFor="street">Street Address:</label>
          <input
            value={formik2.values.street}
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="street"
            name="street"
          />
          {formik2.errors.street ? <div>{formik2.errors.street}</div> : null}
        </div>
        <div className="city">
          <label htmlFor="city">City:</label>
          <input
            value={formik2.values.city}
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="city"
            name="city"
          />
          {formik2.errors.city ? <div>{formik2.errors.city}</div> : null}
        </div>
        <div className="state">
          <label htmlFor="state">State:</label>
          <input
            value={formik2.values.state}
            className="input"
            onChange={formik2.handleChange}
            name="state"
            type="text"
            id="state"
          />
        </div>
        <div className="zip">
          <label htmlFor="zip">Zip:</label>
          <input
            value={formik2.values.zip}
            name="zip"
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="zip"
          />
        </div>
        <div className="country">
          <label htmlFor="country">Country:</label>
          <input
            value={formik2.values.country}
            name="country"
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="country"
          />
        </div>
      </form>

      <p>bill to</p>

      <form /*ref={clientFormRef}*/ className="AddressForm">
        <div className="clientsName">
          <label htmlFor="clientsName">Clients Name:</label>
          <input
            value={formik2.values.clientsName}
            onChange={formik2.handleChange}
            name="clientsName"
            type="text"
            id="clientsName"
          />
        </div>
        <div className="clientsEmail">
          <label htmlFor="clientsEmail">Clients Email:</label>
          <input
            value={formik2.values.clientsEmail}
            className="input"
            onChange={formik2.handleChange}
            name="clientsEmail"
            type="text"
            id="clientsEmail"
          />
        </div>
        <div className="street">
          <label htmlFor="cstreet">Street Address:</label>
          <input
            value={formik2.values.cstreet}
            name="cstreet"
            className="input"
            onChange={formik2.handleChange}
            id="cstreet"
          />
        </div>
        <div className="city">
          <label htmlFor="ccity">City:</label>
          <input
            value={formik2.values.ccity}
            name="ccity"
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="ccity"
          />
        </div>
        <div className="state">
          <label htmlFor="cstate">State:</label>
          <input
            value={formik2.values.cstate}
            className="input"
            name="cstate"
            onChange={formik2.handleChange}
            type="text"
            id="cstate"
          />
        </div>
        <div className="zip">
          <label htmlFor="czip">Zip:</label>
          <input
            value={formik2.values.czip}
            name="czip"
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="czip"
          />
        </div>
        <div className="country">
          <label htmlFor="ccountry">Country:</label>
          <input
            value={formik2.values.ccountry}
            name="ccountry"
            className="input"
            onChange={formik2.handleChange}
            type="text"
            id="ccountry"
          />
        </div>

        <div className="bottomInvoice">
          <div className="invoiceDate">
            <label htmlFor="invoiceDate">Invoice Date:</label>
            <input
              value={formik2.values.invoiceDate}
              name="invoiceDate"
              className="input"
              onChange={formik2.handleChange}
              type="date"
              id="invoiceDate"
            />
          </div>
          <div className="paymentTerms">
            <label htmlFor="paymentTerms">Payment Terms:</label>
            <select
              value={formik2.values.paymentTerms}
              onChange={formik2.handleChange}
              name="paymentTerms"
              // onChange={(e) => {
              //   setPaymentTerms(e.target.value);
              // }}
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
          <div className="productDescription">
            <label htmlFor="productDescription">Product Description:</label>
            <input
              value={formik2.values.prodDes}
              className="input"
              name="prodDes"
              onChange={formik2.handleChange}
              type="text"
              id="productDescription"
            />
          </div>
        </div>
      </form>
      {itemsArr.map((item, index) => {
        return (
          <Item
            id={item.id}
            total={item.total}
            index={index}
            key={index}
            className="Item"
            onChange={onChange}
            defaultName={item.itemName}
            defaultQty={item.qty}
            defaultPrice={item.price}
            handleDeleteClick={handleDeleteClick}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            handleSave={handleSave}
          />
        );
      })}
      <button onClick={() => handleAddClick()}>add item</button>
      <button onClick={handleCancel}>cancel</button>
      <button type="submit" onClick={formik2.handleSubmit}>
        Save Changes
      </button>
    </div>
  );
}
