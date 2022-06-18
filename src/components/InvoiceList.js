  import React, {useEffect, useState, useContext } from 'react'
  import GlobalContext from '../GlobalContext'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import empty from '../assets/illustration-empty.svg'

  export default function InvoiceList({setPage}) { 
    const {list, loading, setClickedIndex} = useContext(GlobalContext)

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
            <Invoice setPage={setPage} index={index} />

          )
        })}

      </div>
    )

};  