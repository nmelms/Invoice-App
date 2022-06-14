import React from 'react'
import NavBar from './NavBar'
import InvoiceTitle from './InvoiceTitle'
import Filter from './Filter'
import NewButton from './NewButton'
import InvoiceList from './InvoiceList'

export default function Home({ setClickedIndex, setPage, itemsArr,loading, list }) {
  return (
    <>
    <NavBar />
    <div className='homeHeader'>
      <InvoiceTitle itemsArr={itemsArr}/>
      <Filter />
      <NewButton setPage={setPage} />
    </div>
    <InvoiceList setClickedIndex={setClickedIndex} setPage={setPage} loading={loading} list={list} />
    </>

  )
}
