import React, {useContext} from 'react'
import GlobalContext from '../GlobalContext'


export default function InvoiceTitle () {
  const {list} = useContext(GlobalContext)
  
  return (
    <div className="InvoiceTitle">
      <h1>INVOCIES</h1>
      {list.length === 0 ? <p>No Invoices</p> : list.length + 'Invoices'} 
    </div>
  )
}
