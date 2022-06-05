import React, {useEffect} from 'react'
import { collection, doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebase.js'


export default function AddressForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {name: 'nickmelms'}
    const dbRef = doc(collection(db, 'form'))
    setDoc(dbRef, data)
  }

  return (
      <form className="AddressForm">
        <div className="street">
          <label htmlFor="street">Street Address:</label>
          <input type="text" id="street" />
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
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
  )
}
