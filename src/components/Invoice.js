import React, {useEffect, useState} from 'react'


export default function Invoice({id, paymentDue, clientName, total, status, setPage, setClickedIndex, data}) {
  const [updatedDate, setUpdatedDate] = useState()
  
  const handleClick = (e) => {
    setPage('viewInvoice')
    setClickedIndex(id)
  }

  useEffect(() => {
    let date = new Date(data[id].invoiceDate)
    console.log(date )
    date.setDate(date.getDate() + 32 )
    setUpdatedDate(date.toDateString().split(' ').splice(1).join(' '))
    console.log(date.toDateString().split(' ').splice(1).join(' '))
  }, [])


  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{id}</div>
      <div className="clientsName">{clientName}</div>
      <div className="paymentDue">due {updatedDate}</div>
       <div className="status">{status}</div>
      <div className="total">{total}</div>
    </div>
  )
}
