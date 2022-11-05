import React, { useContext, useEffect, useState, useRef } from "react";
import GlobalContext from "../GlobalContext";
import FormAlert from "./FormAlert";
import NavBar from "./NavBar";
import BackButton from "./BackButton";
import AddItemBtn from "./AddItemBtn";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { useFormik, Formik } from "formik";
import Item from "./Item.js";
import "../index.css";

export default function EditInvoice({ setPage, action }) {
  const [currentItems, setCurrentItems] = useState([]);
  const {
    userId,
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
    setShowEditInvoice,
  } = useContext(GlobalContext);
  const [showAlert, setShowAlert] = useState(true);
  const alertRef = useRef();
  const item = list.find((item) => item.id === itemId);
  const itemsArr = item.items;
  const itemRef = doc(db, userId, `${item.id}`);

  useEffect(() => {
    setCurrentItems(itemsArr);
  }, []);

  const handleCancel = (setFieldValue) => {
    setFieldValue("street", item.street);
    setFieldValue("city", item.city);
    setFieldValue("state", item.state);
    setFieldValue("zip", item.zip);
    setFieldValue("country", item.country);
    setFieldValue("clientsName", item.clientsName);
    setFieldValue("clientsEmail", item.clientsEmail);
    setFieldValue("cstreet", item.cstreet);
    setFieldValue("ccity", item.ccity);
    setFieldValue("cstate", item.cstate);
    setFieldValue("czip", item.czip);
    setFieldValue("paymentTerms", item.paymentTerms);
    setFieldValue("prodDes", item.prodDes);
    setFieldValue("invoiceDate", item.invoiceDate);
    setFieldValue("city", item.city);
    setCurrentItems(item.items);
  };
  const handleDeleteClick = (e, id) => {
    let newArr = currentItems.filter((item) => item.id != id);
    setCurrentItems(newArr);
  };

  const handleAddClick = async () => {
    let newArr = [...currentItems];
    newArr.push({
      itemName: "",
      qty: 0,
      price: 0,
      id: Math.random(),
      total: 0,
    });

    setCurrentItems(newArr);
  };

  const onChange = async (e, index) => {
    let newArr = [...currentItems];
    let value = e.target.value;
    let id = e.target.id;
    let currentItem = newArr[index];

    if (id === "itemName") {
      currentItem.itemName = value;
    } else if (id === "qty") {
      currentItem.qty = value;
    } else {
      currentItem.price = value;
    }
    let total = currentItem.qty * currentItem.price;
    currentItem.total = total;
    setCurrentItems(newArr);
  };

  return (
    <div className="newInvoice">
      <BackButton action={action} name="viewInvoice" />
      <div className="newInvoiceBody">
        <h1>Edit #{item.tag}</h1>
        <p>bill from</p>
        <Formik
          className="AddressForm"
          initialValues={{
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
          }}
          onSubmit={(values, { resetForm }) => {
            const dbRef = doc(db, userId, item.id);
            values.items = currentItems;
            values.status = "Pending";
            updateDoc(dbRef, values);
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
          {(props) => (
            <form className="AddressForm" onSubmit={props.handleSubmit}>
              <div className="street">
                <label htmlFor="street">Street Address:</label>
                <input
                  value={props.values.street}
                  className="input"
                  onChange={props.handleChange}
                  type="text"
                  id="street"
                  name="street"
                />
              </div>
              <div className="city">
                <label htmlFor="city">City:</label>
                <input
                  value={props.values.city}
                  className="input"
                  onChange={props.handleChange}
                  type="text"
                  id="city"
                  name="city"
                />
              </div>
              <div className="state">
                <label htmlFor="state">State:</label>
                <input
                  value={props.values.state}
                  className="input"
                  onChange={props.handleChange}
                  name="state"
                  type="text"
                  id="state"
                />
              </div>
              <div className="zip">
                <label htmlFor="zip">Zip:</label>
                <input
                  value={props.values.zip}
                  name="zip"
                  className="input"
                  onChange={props.handleChange}
                  type="text"
                  id="zip"
                />
              </div>
              <div className="country">
                <label htmlFor="country">Country:</label>
                <input
                  value={props.values.country}
                  name="country"
                  className="input"
                  onChange={props.handleChange}
                  type="text"
                  id="country"
                />
              </div>
              <p className="billTo purpleText">bill to</p>
              <div className="clientsName">
                <label htmlFor="clientsName">Clients Name:</label>
                <input
                  className="input"
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
              <div className="cstreet">
                <label htmlFor="cstreet">Street Address:</label>
                <input
                  className="input"
                  onChange={props.handleChange}
                  value={props.values.cstreet}
                  name="cstreet"
                  id="cstreet"
                />
              </div>
              <div className="cstate">
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
              <div className="ccity">
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
              <div className="czip">
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
              <div className="ccountry">
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
                    value={props.values.invoiceDate}
                    name="invoiceDate"
                    className="input"
                    onChange={props.handleChange}
                    type="date"
                    id="invoiceDate"
                  />
                </div>
                <div className="paymentTerms">
                  <label htmlFor="paymentTerms">Payment Terms:</label>
                  <select
                    className="input"
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
                  <label htmlFor="productDescription">
                    Product Description:
                  </label>
                  <input
                    value={props.values.prodDes}
                    className="input"
                    name="prodDes"
                    onChange={props.handleChange}
                    type="text"
                    id="productDescription"
                  />
                </div>
              </div>

              {showAlert && (
                <FormAlert
                  isValid={props.isValid}
                  setShowAlert={setShowAlert}
                  showAlert={showAlert}
                  alertRef={alertRef}
                />
              )}
              {!props.isValid && props.submitCount > 0
                ? setShowAlert(true)
                : setShowAlert(false)}
              <div className="buttons">
                <button
                  className="editCancelBtn"
                  type="button"
                  onClick={() => handleCancel(props.setFieldValue)}
                >
                  cancel
                </button>
                <button className="paidBtn" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </Formik>
        {currentItems.map((item, index) => {
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
            />
          );
        })}
      </div>
      <AddItemBtn handleAddClick={handleAddClick} />
    </div>
  );
}
