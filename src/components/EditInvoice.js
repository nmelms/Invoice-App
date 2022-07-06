import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import BackButton from "./BackButton";
import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
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
  console.log(item);

  const itemRef = doc(db, "form", `${item.id}`);

  useEffect(() => {
    setStreet(item.street);
    setCity(item.city);
    setState(item.state);
    setZip(item.zip);
    setCountry(item.country);
    setClientsName(item.clientsName);
    setClientsEmail(item.clientsEmail);
    setCStreet(item.cstreet);
    setCCity(item.ccity);
    setCState(item.cstate);
    setCZip(item.czip);
    setPaymentTerms(item.paymentTerms);
    setProdDes(item.prodDes);
    setInvoiceDate(item.invoiceDate);
    setIndexer(item.indexer);
    setCurrentItems(itemsArr);
  }, []);

  const handleSave = async () => {
    console.log(city);
    await updateDoc(itemRef, {
      street,
      city,
      items: itemsArr,
      state,
      zip,
      country,
      clientsName,
      clientsEmail,
      cStreet,
      cCity,
      cZip,
      cCountry,
      paymentTerms,
      prodDes,
      invoiceDate,
    });
  };
  const handleDeleteClick = (e, id) => {
    console.log(itemsArr);
    let newArr = itemsArr.filter((item) => item.id != id);
    console.log(newArr);

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
            defaultValue={item.street}
            className="input"
            onChange={formik.handleChange}
            type="text"
            id="street"
            name="street"
          />
          {formik.errors.street ? <div>{formik.errors.street}</div> : null}
        </div>
        <div className="city">
          <label htmlFor="city">City:</label>
          <input
            defaultValue={item.city}
            className="input"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
          />
        </div>
        <div className="state">
          <label htmlFor="state">State:</label>
          <input
            defaultValue={item.state}
            className="input"
            onChange={(e) => setState(e.target.value)}
            type="text"
            id="state"
          />
        </div>
        <div className="zip">
          <label htmlFor="zip">Zip:</label>
          <input
            defaultValue={item.zip}
            className="input"
            onChange={(e) => setZip(e.target.value)}
            type="text"
            id="zip"
          />
        </div>
        <div className="country">
          <label htmlFor="country">Country:</label>
          <input
            defaultValue={item.country}
            className="input"
            onChange={(e) => setCountry(e.target.value)}
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
            defaultValue={item.clientsName}
            onChange={(e) => setClientsName(e.target.value)}
            type="text"
            id="clientsName"
          />
        </div>
        <div className="clientsEmail">
          <label htmlFor="clientsEmail">Clients Email:</label>
          <input
            defaultValue={item.clientsEmail}
            className="input"
            onChange={(e) => setClientsEmail(e.target.value)}
            type="text"
            id="clientsEmail"
          />
        </div>
        <div className="street">
          <label htmlFor="cstreet">Street Address:</label>
          <input
            defaultValue={item.cStreet}
            className="input"
            onChange={(e) => setCStreet(e.target.value)}
            id="cstreet"
          />
        </div>
        <div className="city">
          <label htmlFor="ccity">City:</label>
          <input
            defaultValue={item.cCity}
            className="input"
            onChange={(e) => setCCity(e.target.value)}
            type="text"
            id="ccity"
          />
        </div>
        <div className="state">
          <label htmlFor="cstate">State:</label>
          <input
            defaultValue={item.cState}
            className="input"
            onChange={(e) => setCState(e.target.value)}
            type="text"
            id="cstate"
          />
        </div>
        <div className="zip">
          <label htmlFor="czip">Zip:</label>
          <input
            defaultValue={item.cZip}
            className="input"
            onChange={(e) => setCZip(e.target.value)}
            type="text"
            id="czip"
          />
        </div>
        <div className="country">
          <label htmlFor="ccountry">Country:</label>
          <input
            defaultValue={item.cCountry}
            className="input"
            onChange={(e) => setCCountry(e.target.value)}
            type="text"
            id="ccountry"
          />
        </div>

        <div className="bottomInvoice">
          <div className="invoiceDate">
            <label htmlFor="invoiceDate">Invoice Date:</label>
            <input
              defaultValue={item.invoiceDate}
              className="input"
              onChange={(e) => setInvoiceDate(e.target.value)}
              type="date"
              id="invoiceDate"
            />
          </div>
          <div className="paymentTerms">
            <label htmlFor="paymentTerms">Payment Terms:</label>
            <select
              defaultValue={item.paymentTerms}
              onChange={(e) => {
                setPaymentTerms(e.target.value);
              }}
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
          <div className="productDescription">
            <label htmlFor="productDescription">Product Description:</label>
            <input
              defaultValue={item.setProdDes}
              className="input"
              onChange={(e) => setProdDes(e.target.value)}
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
      <button type="submit" onClick={formik.handleSubmit}>
        Save Changes
      </button>
    </div>
  );
}
