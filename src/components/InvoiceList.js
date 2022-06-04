  import React from 'react'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import empty from '../assets/illustration-empty.svg'

  
  export default function InvoiceList() {    
    return (
      <div className="InvoiceList">
        {data === 0 && <img src={empty} />}
        {data != 0 && data.map((item, index) => {
          let data = 0
          return(
            <Invoice 
              id={item.id} 
              paymentDue={item.paymentDue}
              clientName={item.clientName}
              total={item.total}
              status={item.status}
            />               
          )
        })}
      </div>
    )
  }
  