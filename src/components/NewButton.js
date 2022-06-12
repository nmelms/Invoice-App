import React from 'react'
import plusIcon from '../assets/icon-plus.svg'

export default function NewButton({ setPage }) {
  return (
    <button onClick={() => setPage('newInvoice')} className="NewButton">
      <img src={plusIcon} />
      <h2>New Invoice</h2>
    </button>
  )
}
