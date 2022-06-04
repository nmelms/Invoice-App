import React from 'react'
import plusIcon from '../assets/icon-plus.svg'

export default function NewButton() {
  return (
    <div className="NewButton">
      <img src={plusIcon} />
      <h2>New Invoice</h2>
    </div>
  )
}
