import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DBContext } from '../../contexts/db_context'
import BudgetItem from './BudgetItem'
import './BudgetItemList.css'

function BudgetItemList({ isExpense }) {
    const { month, year, budget } = useContext(DBContext)
    const [items, setItems] = useState(null)

    const filterItems = () => {
        const itemArr = Object.values(budget)
        setItems(itemArr.filter(i => i.isExpense === isExpense))
    }

    useEffect(() => {
        filterItems()
    }, [budget])

    return (
        <div className="budget-item-list-container">
            <h1>{isExpense ? 'Expenses' : 'Income'}</h1>
            <div className='budget-item-list'>
                {items ? items.map(item => <BudgetItem budgetItem={item} key={item.name} />) : "no budget items"}
            </div>
        </div>
    )
}

export default BudgetItemList