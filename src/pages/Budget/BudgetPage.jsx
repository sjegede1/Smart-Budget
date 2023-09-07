import React, { useContext, useEffect, useState } from 'react'
import TransactionsList from '../../components/Budget/TransactionsList'
import { DBContext } from '../../contexts/db_context'
import BudgetItemList from '../../components/Budget/BudgetItemList'
import { AuthContext } from '../../contexts/auth_context'
import BudgetMonth from '../../components/Budget/BudgetMonth'
import BudgetItem from '../../components/Budget/BudgetItem'
import CreateBudgetItem from '../../components/Budget/CreateBudgetItem'

function BudgetPage() {
  // TODO: If there is not budget in the DB for this month-year 
  // render a template which should be defined in the front-end
  // TODO: filter transactions by start and end date (default values will be fore this month on the budget page)
  // TODO: sync-transactions when you open the budget page
  const {
    month, year, monthNames, syncTransactions,
    getBudget, budget, setBudget, createOrUpdateBudget,
  } = useContext(DBContext)
  const {uid} = useContext(AuthContext)


  const getIncome = () => {
    // TODO: filter budgets for income
  }

  useEffect(() => {
    syncTransactions(uid)
    getBudget(uid)
  },[uid, month, year])
  return (
    <div>
      <CreateBudgetItem />
      <BudgetItemList isExpense={false} />
      <BudgetItemList isExpense={true} />
      <TransactionsList />
      <BudgetMonth />
    </div>
  )
}

export default BudgetPage