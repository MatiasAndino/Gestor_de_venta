import React from 'react'
import { useNavigate } from 'react-router-dom';

const LinkNavbar = ({ text }) => {

  const navigate = useNavigate();
  
  return (
    <a className="text-light link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-3" role='button' onClick={() => navigate(`/${text.toLowerCase()}`)} >{text}</a>
    // <a className="nav-link text-white fs-6"  href={`/${text.toLowerCase()}`} style={linkStyle} >{text}</a>
  )
}

export default LinkNavbar