import React, { useCallback, useContext } from 'react'
import { DBContext } from '../../contexts/db_context'
import PieChart from '../../components/Charts/PieChart'
import BudgetMonth from '../../components/Budget/BudgetMonth'

function Dashboard() {
    const {month, year, monthNames} = useContext(DBContext)
  return (
    <div>
        <h1>Dashboard</h1>
        <h2>{monthNames[month]} {year}</h2>
        <BudgetMonth />
        <PieChart />

    </div>
  )
}

export default Dashboard