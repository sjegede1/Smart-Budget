import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Auth/Logout'

function Nav() {
  return (
    <nav>
        <Link to="/" >
          Budget
        </Link> &nbsp; | &nbsp;
        <Link to="/wallets" >
          Wallets
        </Link> &nbsp; | &nbsp;
        <Link to="/auth">
          Login/SignUp
        </Link> &nbsp; | &nbsp;
        <Link to="/test">
          Test
        </Link> &nbsp; | &nbsp;
        <Logout />
    </nav>
  )
}

export default Nav
