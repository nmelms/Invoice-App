import React, {useState} from 'react'
import Home from './components/Home.js'
import NewInvoice from './components/NewInvoice.js'
import NavBar from './components/NavBar.js'
import InvoiceTitle from './components/InvoiceTitle.js'
import Filter from './components/Filter.js'
import NewButton from './components/NewButton.js';
import InvoiceList from './components/InvoiceList.js'
import BackButton from './components/BackButton.js';
import ListMovies from './components/ListMovies.js'
import AddressForm from './components/AddressForm.js';
import Item from './components/Item.js';

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="App">
      {page == 'home' &&  <Home setPage={setPage} />}
      {page == 'newInvoice' &&  <NewInvoice setPage={setPage} />}



    </div>
  );
}

export default App;
