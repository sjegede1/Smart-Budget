import React, { useContext, useState } from 'react'
import { DBContext } from '../../contexts/db_context'

function BudgetItemList() {
    const { month, year } = useContext(DBContext)
    const [isExpense, setIsExpense] = useState(true)
    return (
        <div>
            <h1>{isExpense? 'Expenses' : 'Income'}</h1>
        </div>
    )
}

export default BudgetItemList