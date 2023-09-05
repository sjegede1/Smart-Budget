import React, { useContext, useState } from 'react'
import TransactionsList from '../../components/Budget/Transactions/TransactionsList'
import { DBContext } from '../../contexts/db_context'
function BudgetPage() {
  // TODO: If there is not budget in the DB for this month-year render an offer ot poplaute from template or previous month
  // TODO: filter transactions by start and end date (default values will be fore this month on the budget page)
  //TODO: sync-transactions when you ope the budget page
  const {month, year, monthNames} = useContext(DBContext)

  return (
    <div>
      <h1>{`${monthNames[month]} ${year}`}</h1>
      
      <TransactionsList />
    </div>
  )
}

export default BudgetPage