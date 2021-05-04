import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('loginDetails')
  }
  return (
    <div className="container">
      <ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="white">
        <ReactBootStrap.Navbar.Brand>
          <NavLink to="/">
            <span className="fs-6 text-secondary  text">BusinessInsights</span>
          </NavLink>
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle
          bg="dark"
          aria-controls="responsive-navbar-nav"
        />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="ml-auto ">
            
            <NavLink to="/">
              <span className="fs-8 nav_text text-secondary" onClick={logout}>
                Logout
              </span>
            </NavLink>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  )
}

export default NavBar
