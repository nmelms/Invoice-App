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
    date.setDate(date.getDate() + data[id].paymentTerms )
    console.log(data)
    setUpdatedDate(date.toDateString().split(' ').splice(1).join(' '))
    console.log(date.toDateString().split(' ').splice(1).join(' '))
  }, [])

  const statusClick = () => {
    setPage('home')
  }

  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{id}</div>
      <div className="clientsName">{clientName}</div>
      <div className="paymentDue">due {updatedDate}</div>
       <div onClick={() => statusClick()} className="status">{data[id].status}</div>
      <div className="total">{total}</div>
    </div>
  )
}
