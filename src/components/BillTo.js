import React from 'react'
import AddressForm from './AddressForm.js'

export default function BillTo() {
  return (
    <div className="BillTo">
      <div className="clientsName">
        <label for="name">Clients Name:</label>
        <input type="text" id="name" />
      </div>
      <div className="clientsEmail">
        <label for="email">Clients Email:</label>
        <input type="email" id="email" />
      </div>
    </div>
  )
}
