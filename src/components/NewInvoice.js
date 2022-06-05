import React, {useState} from 'react'
import BackButton from './BackButton.js'
import NavBar from './NavBar.js'
import AddressForm from './AddressForm'
import BillTo from './BillTo.js'
import {collection, doc, setDoc}  from 'firebase/firestore'
import { db } from '../firebase'
export default function NewInvoice() {
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data ={
      street,

    }
    const dbRef = doc(collection(db, 'form'))
    setDoc(dbRef, data)
  }
  
  return (
    <div>
      <NavBar />
      <BackButton />
      <h1>New Invoice</h1>
      <p>bill from</p>
      <form className="AddressForm">
        <div className="street">
          <label htmlFor="street">Street Address:</label>
          <input onChange={(e) => setStreet(e.target.value)} type="text" id="street" />
        </div>
        <div className="city">
          <label htmlFor="street">City:</label>
          <input type="text" id="street" />
        </div>
        <div className="zip">
          <label htmlFor="street">Zip:</label>
          <input type="text" id="zip" />          
        </div>
        <div className="country">
          <label htmlFor="street">Country:</label>
          <input type="text" id="country" />
        </div>
      </form>
      <p>bill to</p>
      <form className="AddressForm">
      <div className="clientsName">
          <label htmlFor="clientsName">Clients Name:</label>
          <input type="text" id="clientsName" />
        </div>
        <div className="clientsEmail">
          <label htmlFor="clientsEmail">Clients Email:</label>
          <input type="text" id="clientsEmail" />
        </div>
        <div className="street">
          <label htmlFor="cstreet">Street Address:</label>
          <input id="cstreet" />
        </div>
        <div className="city">
          <label htmlFor="ccity">City:</label>
          <input type="text" id="ccity" />
        </div>
        <div className="zip">
          <label htmlFor="czip">Zip:</label>
          <input type="text" id="czip" />          
        </div>
        <div className="country">
          <label htmlFor="ccountry">Country:</label>
          <input type="text" id="ccountry" />
        </div>    
      </form>
      <input type="submit" onClick={(e) => handleSubmit(e)} />
    </div>
  )
}
