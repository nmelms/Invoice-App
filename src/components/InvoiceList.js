  import React, {useEffect, useState, } from 'react'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import empty from '../assets/illustration-empty.svg'

  
  export default function InvoiceList({ loading, list, setPage }) { 

return (
  <div>

    {loading ? <h1>loading...</h1> : list.map((item) => {
      return(
        <Invoice setPage={setPage} id={'#88765'} total={'100'} status={'pending'} paymentDue={'dec 31st'} clientName={item.clientsName}/>
      )
    })}

  </div>
)

};  