import React from 'react'

export default function Item() {
  return (
    <div className="Item">
        <div className="itemName">
          <label htmlFor="itemName">Item Name</label>
          <input className="input"   type="text" id="itemName" />
        </div>
        <div className="qty">
          <label htmlFor="qty">Qty.</label>
          <input className="input"   type="text" id="qty" />
        </div>
        <div className="price">
          <label htmlFor="price">Price</label>
          <input className="input"  type="text" id="price" />
        </div>
        <div className="total">
            <p>total</p>
            <p>420</p>
      </div>
      <div>
        <p>x</p>
      </div>
    </div>
  )
}
