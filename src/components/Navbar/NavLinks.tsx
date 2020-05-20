import React from 'react'
import { NavLink } from 'react-router-dom'
import  './NavLinks.css'

export const NavLinks = () => {

  return (
    <>
      <NavLink exact to='/' className="baseStyles" activeClassName="activeRoute" >
        Search!
      </NavLink>
      <NavLink exact to='/sign-up' className="baseStyles" activeClassName="activeRoute" >
        Sign Up
      </NavLink>
      <NavLink exact to='/login' className="baseStyles" activeClassName="activeRoute" >
        Login
      </NavLink>
    </>
  )
}

