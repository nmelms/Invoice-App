import React from 'react'
import BackButton from './BackButton'

export default function ViewInvoice({ data, setPage, clickedIndex }) {
  return (
    
    <div>
      <BackButton setPage={setPage}/>
      {console.log(data)}
      <div>
        <p>{data[clickedIndex].clientsName}</p>
      </div>
      <div>
        <h2></h2>
      </div>
      
    </div>
  )
}
