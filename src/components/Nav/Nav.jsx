import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Auth/Logout'
import { DBContext } from '../../contexts/db_context'

function Nav() {
  const { month, monthNames, year } = useContext(DBContext)
  return (
    <nav>
      <span>
        <b>{`${monthNames[month]} ${year}`}</b>
      </span> &nbsp; | &nbsp;
      <Link to="/" >
        Budget
      </Link> &nbsp; | &nbsp;
      <Link to="/wallets" >
        Wallets
      </Link> &nbsp; | &nbsp;
      <Link to="/auth">
        Login/SignUp
      </Link> &nbsp; | &nbsp;
      <Link to="/dashboard">
        Dashboard
      </Link> &nbsp; | &nbsp;
      <Logout />
    </nav>
  )
}

export default Nav
