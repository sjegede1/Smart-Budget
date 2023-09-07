import React, { useContext, useEffect } from 'react'
import { DBContext } from '../../contexts/db_context'
import { AuthContext } from '../../contexts/auth_context'
import Transaction from './Transaction'
import './TransactionsList.css'

function TransactionsList() {
  const { transactions, getTransactions, API_HOST, setMonth, month, year, budget } = useContext(DBContext)
  const { uid } = useContext(AuthContext)

  useEffect(() => {
    console.log('UID for TransactionsList.jsx', uid)
    if (uid) {
      getTransactions(uid)
    }
  }, [month, year])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(month, year)
  //   setMonth(parseInt(e.target.month.value))
  // }

  return (
    <div className='transactions-list-container'>
      <h1>Transactions List</h1>
      <div className='transactions-list'>

        {/* <form onSubmit={handleSubmit}>
        <input type="text" name="month" id="month" />
        <input type="submit" value="change date" />
      </form> */}
        {transactions.length ?
          transactions.map((transaction) => {
            return (
              <Transaction key={transaction.transaction_id} transaction={transaction} budget={budget} />
            )
          })
          : "No transactions in the given date range (optionally sync transactions)"}
      </div>
    </div>
  )
}

export default TransactionsList