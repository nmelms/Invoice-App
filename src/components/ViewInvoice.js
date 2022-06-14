import React from 'react'
import BackButton from './BackButton'
import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../firebase'


export default function ViewInvoice({ data, setPage, clickedIndex }) {
  const onDeleteClick = async () => {
    console.log(data[clickedIndex].id)
    await deleteDoc(doc(db, "form", data[clickedIndex].id));
  }
  return (
    
    <div>
      <BackButton setPage={setPage}/>
      <div>
        <p>{data[clickedIndex].clientsName}</p>
      </div>
      <div>
        <h2><button onClick={() => onDeleteClick()}>delete</button></h2>
      </div>
      
    </div>
  )
}
