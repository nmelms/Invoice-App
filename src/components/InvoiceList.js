  import React, {useEffect, useState, } from 'react'
  import Invoice from './Invoice.js'
  import data from '../data/data.json'
  import { doc, getDoc, getDocs, collection } from "firebase/firestore";
  import empty from '../assets/illustration-empty.svg'
  import {db} from '../firebase'
  
  export default function InvoiceList() { 
    const [list, setList] = useState([])
    const [loading, setLoading] =useState(true)
    const dataRef = collection(db, 'form')

    useEffect(() => {
      const fetchData = async () => {
        const data = await getDocs(dataRef)
        setList(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(list)
        setLoading(false)
      }
      fetchData()
    }, [])




return (
  <div>

    {loading ? <h1>loading...</h1> : list.map((item) => {
      return(
        <Invoice id={'#88765'} total={'100'} status={'pending'} paymentDue={'dec 31st'}clientName={item.clientsName}/>
      )
    })}

  </div>
)

};  