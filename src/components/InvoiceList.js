  import React, {useEffect, useState, } from 'react'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import { doc, getDoc, getDocs, collection } from "firebase/firestore";
  import empty from '../assets/illustration-empty.svg'
  import {db} from '../firebase'
  
  export default function InvoiceList() { 
    const [list, setList] = useState([])
    const dataRef = collection(db, 'form')

    useEffect(() => {
      const fetchData = async () => {
        const data = await getDocs(dataRef)
        setList(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(list)
      }
      fetchData()
    }, [])




return (
  <div>
    {list.map((item) => {
      return(
        <Invoice id={'hwmm'} clientName={item.clientsName}/>
      )
    })}
  </div>
)

};  