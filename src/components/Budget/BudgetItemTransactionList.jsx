import React, { useContext } from 'react'
import { DBContext } from '../../contexts/db_context'
import Transaction from './Transaction'

function BudgetItemTransactionList({ transactions, category }) {
    console.log(transactions)
    return (
        transactions ?
        <div className='budget-item-transactions-list'>
            {transactions.map((t) => {
                if (t.transaction_id) {
                    return <Transaction transaction={t} category={category} />
                }
            })}
        </div> : "Wowzers"
    )
}

export default BudgetItemTransactionList