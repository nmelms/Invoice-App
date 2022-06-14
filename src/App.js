import React, {useState, useEffect} from 'react'
import Home from './components/Home.js'
import NewInvoice from './components/NewInvoice.js'
import NavBar from './components/NavBar.js'
import InvoiceTitle from './components/InvoiceTitle.js'
import Filter from './components/Filter.js'
import NewButton from './components/NewButton.js';
import InvoiceList from './components/InvoiceList.js'
import BackButton from './components/BackButton.js';
import AddressForm from './components/AddressForm.js';
import Item from './components/Item.js';
import {db} from './firebase'
import ViewInvoice from './components/ViewInvoice.js'
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

function App() {
  const [itemsArr, setItemsArr] = useState([])
  const [page, setPage] = useState('home')
  const [clickedIndex, setClickedIndex] = useState()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const dataRef = collection(db, 'form')



  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(dataRef)
      setList(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
      setLoading(false)
      console.log(list)
    }
    fetchData()
  }, [])



  return (
    <div className="App">
      {page == 'home' &&  <Home setClickedIndex={setClickedIndex}list={list} loading={loading} itemsArr={itemsArr} setPage={setPage} />}
      {page == 'newInvoice' &&  <NewInvoice setItemsArr={setItemsArr} itemsArr={itemsArr} setPage={setPage} />}
      {page == 'viewInvoice' && <ViewInvoice clickedIndex={clickedIndex} setPage={setPage} data={list}/>}
    </div>
  );
}

export default App;
