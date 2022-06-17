  import React, {useEffect, useState, } from 'react'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import empty from '../assets/illustration-empty.svg'

  
  export default function InvoiceList({ setClickedIndex, loading, list, setPage }) { 

return (
  <div>
    {list.length === 0 && 
    <div>
      <img src={empty}  />
      <h3>there is nothing here</h3>
      <p>Click the new button to create a new invoice</p>
    </div>} 
    {loading ? <h1>loading...</h1> : list.map((item, index) => {
      return(
        <Invoice data={list} setClickedIndex={setClickedIndex} setPage={setPage} id={index} total={'100'} status={'pending'} paymentDue={'dec 31st'} clientName={item.clientsName}/>

       )
    })}

  </div>
)

};  