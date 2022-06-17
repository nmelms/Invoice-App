import React from 'react'

export default function InvoiceTitle ({ list }) {
  return (
    <div className="InvoiceTitle">
      <h1>INVOCIES</h1>
      {list.length === 0 ? <p>No Invoices</p> : list.length + 'Invoices'} 
    </div>
  )
}
