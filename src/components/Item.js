import React, {useEffect, useState} from 'react'

export default function Item({defaultName, defaultQty, defaultPrice, onChange, id}) {

  return (
    <div className="Item">
        <div className="itemName">
          <label htmlFor="itemName">Item Name</label>
          <input defaultValue={defaultName} onChange={(e) => onChange(e, id)}  className="input"   type="text" id="itemName" />
        </div>
        <div className="qty">
          <label htmlFor="qty">Qty.</label>
          <input defaultValue={defaultQty} onChange={(e) => onChange(e, id)} className="input" type="text" id="qty" />
        </div>
        <div className="price">
          <label htmlFor="price">Price</label>
          <input defaultValue={defaultPrice} onChange={(e) => onChange(e, id)} className="input"type="text" id="price" />
        </div>
        <div className="total">
            <p>total</p>
            <p>420</p>
        </div>
      <div className="itemDelete">
        <p>x</p>
      </div>
    </div>
  )
}
