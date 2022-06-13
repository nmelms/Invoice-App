import React from 'react'

export default function Invoice({id, paymentDue, clientName, total, status, setPage}) {
  return (
    <div onClick={() => setPage('viewInvoice')} className="Invoice">
      <div className="invoiceID">{id}</div>
      <div className="clientsName">{clientName}</div>
      <div className="paymentDue">{paymentDue}</div>
       <div className="status">{status}</div>
      <div className="total">{total}</div>
    </div>
  )
}
