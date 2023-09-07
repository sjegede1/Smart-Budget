import React, { useContext, useEffect } from 'react'
import { DBContext } from '../../contexts/db_context'
import { AuthContext } from '../../contexts/auth_context'
import './Balance.css'

function Balance() {
  const { readAccounts, accounts } = useContext(DBContext)
  const { uid } = useContext(AuthContext)



  useEffect(() => {
    readAccounts(uid)
    console.log(accounts)
  }, [uid])
  return (
    <>
      <h1>Accounts</h1>
      <div className='balance'>

        {accounts ? accounts.map((a, i) => {
          return (
            <div className='account' key={i}>
              <p><b>${a.balances.current}</b> in  {a.name}</p>
            </div>
          )
        }) : "No accounts"}
      </div></>
  )
}

export default Balance