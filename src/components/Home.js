import React from 'react'
import NavBar from './NavBar'
import InvoiceTitle from './InvoiceTitle'
import Filter from './Filter'
import NewButton from './NewButton'
import InvoiceList from './InvoiceList'

export default function Home({ setPage }) {
  return (
    <>
    <NavBar />
    <div className='homeHeader'>
      <InvoiceTitle />
      <Filter />
      <NewButton setPage={setPage} />
    </div>
    <InvoiceList />
    </>

  )
}
