import React from 'react'


export default function Invoice({id, paymentDue, clientName, total, status, setPage, setClickedIndex}) {
  const handleClick = (e) => {
    setPage('viewInvoice')
    setClickedIndex(id)
  }
  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{id}</div>
      <div className="clientsName">{clientName}</div>
      <div className="paymentDue">{paymentDue}</div>
       <div className="status">{status}</div>
      <div className="total">{total}</div>
    </div>
  )
}
