import React, {useState, useRef, useEffect} from 'react'
import BackButton from './BackButton.js'
import NavBar from './NavBar.js'
import AddressForm from './AddressForm'
import BillTo from './BillTo.js'
import {collection, doc, setDoc}  from 'firebase/firestore'
import { db } from '../firebase'
import Item  from './Item.js'

export default function NewInvoice({setPage, itemsArr, setItemsArr}) {
  const formRef = useRef([]);
  const itemRef = useRef([])
  const clientFormRef = useRef([]);
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [clientsName, setClientsName] = useState('')
  const [clientsEmail, setClientsEmail] = useState('')
  const [cStreet, setCStreet] = useState('')
  const [cCity, setCCity] = useState('')
  const [cZip, setCZip] = useState('')
  const [cCountry, setCCountry] = useState('')
  const [items, setItems] = useState([])
  const [userData, setUserData] = useState()
  const [itemName, setItemName] = useState()
  const [qty, setQty] = useState()
  const [price, setPrice] = useState()
  

  let data = {
    street,
    city,
    zip,
    country,
    clientsName,
    clientsEmail,
    cStreet,
    cCity,
    cZip,
    cCountry,
    items: itemsArr,
  }

  const handleAddClick = () => {
    let newArray = [...itemsArr]
    newArray.push({
      itemName: itemName,
      qty: qty,
      price: price,
    })
    setItemsArr(newArray)
    console.log(itemsArr)
  }

  const onChange = (e, index) => {
    let value = e.target.value
    let id = e.target.id
    let name = ''
    let newArr = [...itemsArr]
    let item = newArr[index]
    if(id === "itemName"){
      console.log(item)
      setItemName(value)
      item.itemName = value
    }else if(id === 'qty'){
      console.log(item)
      setQty(value)
      item.qty = value
    }else{
      setPrice(value)
      item.price = value
    }
    newArr[index] = item
    setItemsArr(newArr)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dbRef = doc(collection(db, 'form'))
    setDoc(dbRef, data)
    formRef.current.reset()
    clientFormRef.current.reset()
  }

  return (
    <div>
      <NavBar />
      <BackButton setPage={setPage} />
      <h1>New Invoice</h1>
      <p>bill from</p>
      <form ref={formRef} className="AddressForm">
        <div className="street">
          <label htmlFor="street">Street Address:</label>
          <input className="input" onChange={(e) => setStreet(e.target.value)} type="text" id="street" />
        </div>
        <div className="city">
          <label htmlFor="city">City:</label>
          <input className="input"  onChange={(e) => setCity(e.target.value)} type="text" id="city" />
        </div>
        <div className="zip">
          <label htmlFor="zip">Zip:</label>
          <input className="input"  onChange={(e) => setZip(e.target.value)} type="text" id="zip" />          
        </div>
        <div className="country">
          <label htmlFor="country">Country:</label>
          <input className="input"  onChange={(e) => setCountry(e.target.value)} type="text" id="country" />
        </div>
        </form>

      <p>bill to</p>

      <form ref={clientFormRef} className="AddressForm" >
      <div className="clientsName">
          <label htmlFor="clientsName">Clients Name:</label>
          <input onChange={(e) => setClientsName(e.target.value)} type="text" id="clientsName" />
        </div>
        <div className="clientsEmail">
          <label htmlFor="clientsEmail">Clients Email:</label>
          <input className="input"  onChange={(e) => setClientsEmail(e.target.value)} type="text" id="clientsEmail" />
        </div>
        <div className="street">
          <label htmlFor="cstreet">Street Address:</label>
          <input className="input"  onChange={(e) => setCStreet(e.target.value)} id="cstreet" />
        </div>
        <div className="city">
          <label htmlFor="ccity">City:</label>
          <input className="input"  onChange={(e) => setCCity(e.target.value)} type="text" id="ccity" />
        </div>
        <div className="zip">
          <label htmlFor="czip">Zip:</label>
          <input className="input"  onChange={(e) => setCZip(e.target.value)}type="text" id="czip" />          
        </div>
        <div className="country">
          <label htmlFor="ccountry">Country:</label>
          <input className="input"  onChange={(e) => setCCountry(e.target.value)} type="text" id="ccountry" />
        </div>
        <div className="invoiceDate">
          <label htmlFor="invoiceDate">invoiceDate:</label>
          <input className="input"  onChange={(e) => setCCountry(e.target.value)} type="text" id="invoiceDate" />
        </div>
        <div className="paymentTerms">
          <label htmlFor="paymentTerms">paymentTerms:</label>
          <input className="input"  onChange={(e) => setCCountry(e.target.value)} type="text" id="paymentTerms" />
        </div>   
        <div className="productDescription">
          <label htmlFor="productDescription">productDescription:</label>
          <input className="input"  onChange={(e) => setCCountry(e.target.value)} type="text" id="productDescription" />
        </div>
      </form>        
      <h2>itemList</h2>
      {itemsArr.map((item, index) => {
        return(
            <Item ref={itemRef} id={index} key={index} onChange={onChange} itemName={itemName} setItemName={setItemName} setQty={setQty}  setPrice={setPrice} itemsArr={itemsArr} setItemsArr={setItemsArr} />
        )
      }) }
      
      <button onClick={() => handleAddClick()}>add item</button>        
      <input type="submit" onClick={(e) => handleSubmit(e)} />
    </div>
  )
}