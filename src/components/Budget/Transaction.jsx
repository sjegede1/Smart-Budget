import React, { useContext, useRef, useState } from 'react'
import {DBContext} from '../../contexts/db_context'
import { AuthContext } from '../../contexts/auth_context'
import './Transaction.css'

function Transaction({ transaction, category }) {
  // To edit transactions have them update the Database directly and then rerender the page.
  const {assignTransactionToBudgetItem,removeTransactionToBudgetItem, budget } = useContext(DBContext)
  const {uid } = useContext(AuthContext)
  const formRef = useRef(null)
  const handleChange = (e) => {
    console.log(e.target)
  }
  const addToCategory = async (e) => {
    //TODO: Function add transaction_id to BudgetItem
    e.preventDefault()
    const budgetCategory = e.target.elements.category.options[e.target.elements.category.selectedIndex].value
    const transactionReponse = await assignTransactionToBudgetItem(transaction, budgetCategory, uid)
    console.log(transactionReponse)
  }
  const removeFromCategory = async () => {
    //TODO: Function to remove category from BudgetItem
    console.log('weeeeeeee',formRef.current)
    const budgetCategory = formRef.current.elements.category.options[formRef.current.elements.category.selectedIndex].value
    const transactionReponse = await removeTransactionToBudgetItem(transaction, budgetCategory, uid)
    console.log(transactionReponse)
  }
  return (
    transaction && budget ?
      <div className='transaction'>
        <p>
        <b>${transaction.amount} {transaction.name} </b> <br />
        <span style={{'font-size': '0.5em'}}>
          {transaction.date} <br />
        </span>
          {transaction.personal_finance_category.primary || transaction.category[0]} <br />
        </p>
        <form onSubmit={addToCategory} ref={formRef}>
            <label htmlFor="category">Budget Category: </label>
            <select name="category" id="category"  onChange={handleChange}>
              {category ? <option value={category} selected>{category}</option>: ""}
              {Object.keys(budget).map((cat) => {
                return <option value={cat}>{cat}</option>
              })}
            </select ><br />
            <button type='submit' >
              Add
            </button> &nbsp;
            <button type='button' onClick={removeFromCategory}>
              Remove
            </button>
        </form>

      </div> :
      ""
  )
}

export default Transaction