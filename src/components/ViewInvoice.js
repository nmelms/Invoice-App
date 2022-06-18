import React, {useContext} from 'react'
import BackButton from './BackButton'
import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../firebase'
import GlobalContext from '../GlobalContext';


export default function ViewInvoice({ setPage }) {

  const{list, clickedIndex, } = useContext(GlobalContext)

  const onDeleteClick = async () => {
    console.log(list)
    await deleteDoc(doc(db, "form", list[clickedIndex].id));
  }

  return (
    
    <div>
      <BackButton setPage={setPage}/>
      <div>
        <p></p>
      </div>
      <div>
        <h2><button onClick={() =>  onDeleteClick()} >delete</button></h2>
      </div>
      
    </div>
  )
}
