import React from 'react'
import logo from '../assets/logo.svg'
import avatar from '../assets/image-avatar.jpg'
import theme from '../assets/icon-moon.svg'
export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="theme">
        <img src={theme} />
      </div>
      <div className="avatar">
        <img src={avatar} />
      </div>
    </div>
  )
}
