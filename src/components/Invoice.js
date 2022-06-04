import React from 'react'

export default function Invoice({id, paymentDue, clientName, total, status}) {
  return (
    <div className="Invoice">
      <div>{id}</div>
      <div>{paymentDue}</div>
      <div>{clientName}</div>
      <div>{total}</div>
      <div>{status}</div>
    </div>
  )
}
