import React, {useContext, useEffect} from 'react'
import GlobalContext from '../GlobalContext'
import NavBar from './NavBar'
import InvoiceTitle from './InvoiceTitle'
import Filter from './Filter'
import NewButton from './NewButton'
import InvoiceList from './InvoiceList'

export default function Home({setPage}) {
  const {fetchData, page,  setClickedIndex, loading, list} = useContext(GlobalContext)



  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
    <NavBar />
    <div className='homeHeader'>
      <InvoiceTitle list={list}/>
      <Filter />
      <NewButton setPage={setPage} />
    </div>
    <InvoiceList setPage={setPage}  />
    </>

  )
}
