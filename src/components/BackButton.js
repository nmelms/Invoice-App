import React from 'react'
import backArrow from '../assets/icon-arrow-left.svg'

export default function BackButton({ setPage }) {
  return (
    <button onClick={() => setPage('home')} className="BackButton">
      <img src={backArrow} />
      <h3>Go back</h3>
    </button>
  )
}
