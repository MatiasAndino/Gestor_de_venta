import React from 'react'

const LinkNavbar = ({ text }) => {
  const linkStyle = {
    // width: '20vw',
    fontSize: 'calc(.3rem + .3vw)',
  }


  return (
    <a className="nav-link text-white fs-6"  href={`/${text.toLowerCase()}`} style={linkStyle} >{text}</a>
  )
}

export default LinkNavbar