import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DBContext = createContext()

function DBContextProvider({ children }) {
    const [transactions, setTransactions] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [budget, setBudget] = useState([])
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [accounts, setAccounts] = useState([])

    // SANDBOX
    const API_HOST = "http://localhost:8080"
    // DEVELOPMENT
    // const API_HOST="https://plaid-api-dev.vercel.app"

    // ============= TRANSACTIONS CRUD ACTIONS ==================
    const getTransactions = async (uid) => {
        if (!uid) {
            console.log(`No UID on getTransactions`)
            setTransactions([])
            return
        }
        try {
            const response = await axios.get(`${API_HOST}/api/transactions/${uid}`)
            const filteredData = await filterTransactions(response.data)
            setTransactions(filteredData)
            console.log('db_context.js getTransactions', response.data)
        } catch (err) {
            console.error(err)
            // throw err
        }
    }

    const filterTransactions = async (transactions) => {
        return transactions.filter((t) => {
            const yearMatch = new Date(t.date).getFullYear() == year
            const monthMatch = new Date(t.date).getMonth() == month
            return yearMatch && monthMatch
        })
    }

    const syncTransactions = async (uid) => {
        try {
            const response = await axios.post(`${API_HOST}/api/sync-transactions`, { uid })
            console.log(response.data)
        } catch (err) {
            console.error(err)
            // throw err 
        }
    }

    // ============= BUDGET CRUD ACTIONS ===============
    const getBudget = async (uid) => {
        const params = { month: monthNames[month], year, uid }
        try {
            const response = await axios.get(`${API_HOST}/api/budget`, { params });
            setBudget(response.data)
            console.log(response.data)
        } catch (err) {
            console.error(err);
            // throw err
        }
    }

    const createOrUpdateBudget = async (budgetData, uid) => {
        const params = { uid }
        try {
            const response = await axios.post(`${API_HOST}/api/budget`, {
                params,
                data: budgetData
            });
            setBudget(response.data)
            console.log(response.data)
        } catch (err) {
            console.error(err);
            // throw err
        }
    }

    const assignTransactionToBudgetItem = async (transaction, budgetItem, uid) => {
        // const params = {uid}
        // const data = {month, year, budgetItem, transaction}
        try {
            const response = await axios.post(`${API_HOST}/api/budget-transaction/${uid}`, { month: monthNames[month], year, budgetItem, transaction })
            return response.data
        } catch (err) {
            console.error(err)
            // throw err 
        }
    }
    const removeTransactionToBudgetItem = async (transaction, budgetItem, uid) => {
        // const params = {uid}
        // const data = {month, year, budgetItem, transaction}
        try {
            const response = await axios.delete(`${API_HOST}/api/budget-transaction/${uid}`, { data: { month: monthNames[month], year, budgetItem, transaction } })
            return response.data
        } catch (err) {
            console.error(err)
            // throw err 
        }
    }




    // ACCOUNTS FOR CURRENT BALANCE
    const readAccounts = async (uid) => {
        try {
            const response = await axios.get(`${API_HOST}/api/accounts/${uid}`)
            setAccounts(response.data)
            return response.data
        } catch (err) {
            console.error(err)
            // throw err 
        }
    }


    return (
        <DBContext.Provider value={{
            transactions, setTransactions, getTransactions,
            budget, setBudget, API_HOST, month, setMonth, year, setYear,
            monthNames, syncTransactions, getBudget, createOrUpdateBudget,
            assignTransactionToBudgetItem, removeTransactionToBudgetItem,
            accounts, setAccounts, readAccounts
        }}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContextProvider