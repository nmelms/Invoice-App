import React from 'react'
import downArrow from '../assets/icon-arrow-down.svg'

export default function Filter() {
  return (
    <div className="Filter">
      <h1>filter</h1>
      <img style={{transform: 'scale(.8)'}} src={downArrow} />
    </div>
  )
}
