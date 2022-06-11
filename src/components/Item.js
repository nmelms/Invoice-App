import React, {useEffect, useState} from 'react'

export default function Item({array,itemsArr, itemRef, id, onChange, itemName, getData, setItemsArr, setItemName, setQty, setPrice, handleSubmit}) {

  return (
    <div ref={itemRef} className="Item">
        <div className="itemName">
          <label htmlFor="itemName">Item Name</label>
          <input  onChange={(e) => onChange(e, id)}  className="input"   type="text" id="itemName" />
        </div>
        <div className="qty">
          <label htmlFor="qty">Qty.</label>
          <input onChange={(e) => onChange(e, id)} className="input" type="text" id="qty" />
        </div>
        <div className="price">
          <label htmlFor="price">Price</label>
          <input onChange={(e) => onChange(e, id)} className="input"type="text" id="price" />
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
