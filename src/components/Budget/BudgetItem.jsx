import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DBContext } from '../../contexts/db_context'
import { AuthContext } from '../../contexts/auth_context'
import axios from 'axios'
import BudgetItemTransactionList from './BudgetItemTransactionList'
import './BudgetItem.css'


//TODO: Remove year and month from budget item, it already exists in budget

function BudgetItem({ budgetItem }) {
  const { API_HOST, month, monthNames, year } = useContext(DBContext)
  const { uid } = useContext(AuthContext)
  // const [itemInfo, setItemInfo] = useState({
  //   name: "Category",
  //   year: year,
  //   month: monthNames[parseInt(month)],
  //   target: 0,
  //   actual: 0, // sum of transactions
  //   transactions: [],
  //   isExpense: false
  // })
  const [itemInfo, setItemInfo] = useState(budgetItem)

  const handleChange = async (e) => {
    if (e.target.id === 'isExpense') {
      setItemInfo({
        ...itemInfo,
        [e.target.id]: e.target.checked
      })
      return
    } else if (['actual', 'target'].includes(e.target.id)) {
      setItemInfo({
        ...itemInfo,
        [e.target.id]: Number(e.target.value).toFixed(2)
      })
      return
    } else if (e.target.id === 'year') {
      setItemInfo({
        ...itemInfo,
        [e.target.id]: parseInt(e.target.value)
      })
      return
    }
    setItemInfo({
      ...itemInfo,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    sumTransactions()
    try {
      // TODO: BudgetItem submit route
      const response = await axios.post(`${API_HOST}/api/budget-item/${uid}`, itemInfo)
      console.log('Submitted Budget Item', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      // TODO: BudgetItem delete route
      const response = await axios.put(`${API_HOST}/api/budget-item/${uid}`, itemInfo)
      console.log('Deleted Budget Item', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // Calculate Actual Spending from budget transactions
  const sumTransactions = () => {
    if (itemInfo.transactions) {
      const transactionsArray = Object.values(itemInfo.transactions)
      let sum = 0
      transactionsArray.forEach((t) => {
        sum = Number(sum) + Number(t.amount)
      })
      let newItemInfo = itemInfo
      console.log(newItemInfo)
      newItemInfo.actual = sum
      setItemInfo(newItemInfo)
    }
  }

  useEffect(() => {
    if (budgetItem !== 'create' && budgetItem !== undefined) {
      setItemInfo(budgetItem)
      sumTransactions()
      console.log('budget item available')
    } else {
      setItemInfo({
        name: "Category",
        year: year,
        month: monthNames[parseInt(month)],
        target: 0,
        actual: 0, // sum of transactions
        // transactions: {transaction: "transaction_id"},
        transactions: {},
        isExpense: true
      })
      console.log('Create budget item')
    }
    sumTransactions()
    // setItemInfo({
    //   ...itemInfo,
    //   month: monthNames[month],
    //   year: year
    // })
  }, [month, year])

  return (
    (budgetItem !== 'create' && budgetItem !== undefined) ?
      (<div className='show-budget-item'>
        <h2>{itemInfo.name}</h2>
        <form onSubmit={handleSubmit} className='show-budget-item'>
          <label htmlFor="name">Category Name: </label>
        <input type="text" name="name" id="name" defaultValue={itemInfo.name} onChange={handleChange} /><br />
        {/* <input type="number" step="1" name="year" id="year" defaultValue={itemInfo.year} onChange={handleChange} readOnly /> */}
        {/* <input type="text" name="month" id="month" defaultValue={itemInfo.month} onChange={handleChange} readOnly /> */}
        <label htmlFor="target">Target: </label>
        <input type="number" step="0.01" name="target" id="target" defaultValue={itemInfo.target} onChange={handleChange} /><br />
        <label htmlFor="actual">Actual: </label>
        <input type="number" step="0.01" name="actual" id="actual" defaultValue={itemInfo.actual} onChange={handleChange} readOnly /><br />
        <label htmlFor="isExpense">isExpense</label>
        <input type="checkbox" name="isExpense" id="isExpense" onChange={handleChange} checked={itemInfo.isExpense} /><br />
        <input type="submit" value="edit" /> &nbsp;
        <input type="button" value="delete" onClick={handleDelete} />
      </form>
        <BudgetItemTransactionList transactions={itemInfo.transactions ? Object.values(itemInfo.transactions) : []} category={itemInfo.name ? itemInfo.name : ""} />

      </div>) :
      (budgetItem !== undefined ?
        <>
          <form onSubmit={handleSubmit} className='create-budget-item'>
            <fieldset>
              <legend>New Budget Item</legend>
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" id="name" defaultValue={itemInfo.name} onChange={handleChange} /><br />
              <label htmlFor="year">Year: </label>
              <input type="number" step="1" name="year" id="year" defaultValue={itemInfo.year} onChange={handleChange} /><br />
              <label htmlFor="month">Month: </label>
              <input type="text" name="month" id="month" defaultValue={itemInfo.month} onChange={handleChange} /><br />
              <label htmlFor="target">Target: </label>
              <input type="number" step="0.01" name="target" id="target" defaultValue={itemInfo.target} onChange={handleChange} /><br />
              <label htmlFor="actual">Actual: </label>
              <input type="number" step="0.01" name="actual" id="actual" defaultValue={itemInfo.actual} onChange={handleChange} readOnly /><br />
              <label htmlFor="isExpense">isExpense</label>
              <input type="checkbox" name="isExpense" id="isExpense" onChange={handleChange} checked={itemInfo.isExpense} /><br />
              <input type="submit" value="submit" /> &nbsp;
              <input type="button" value="delete" onClick={handleDelete} />
            </fieldset></form> </> : "undefined")

  )
}

export default BudgetItem