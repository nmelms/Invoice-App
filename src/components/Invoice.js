import React, {useEffect, useState} from 'react'
import {db} from '../firebase'
import {doc} from 'firebase/firestore'
import  GlobalContext  from '../GlobalContext.js'
import {useContext} from 'react'


export default function Invoice({setPage, index}) {
  const { item,   paymentDue,list, clickedIndex, clientName, total, status, setClickedIndex, data, paymentTerms } = useContext(GlobalContext)
  
  const current = new Date(list[index].invoiceDate)
  const [updatedDate, setUpdatedDate] = useState()

  const handleClick = (e) => { 
    setPage('viewInvoice')
    setClickedIndex(index)
  }

  // const statusClick = () => {
  //   setPage('home')
  //   console.log('switch')
  //   db.collection("form").doc(data[index].id).update({status: "fufffiled"});
  // }

  return (
    <div onClick={(e) => handleClick(e)} className="Invoice">
      <div className="invoiceID">{index}</div>
      <div className="clientsName">{clientName}</div>
      <div className="paymentDue">due {list[index].dueDate}</div>
       <div className="status"></div>
      <div className="total">{total}</div>
    </div>
  )
}
