import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DBContext = createContext()

function DBContextProvider({ children }) {
    const [transactions, setTransactions] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [budgets, setBudgets] = useState([])
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

    // ============= BUDGET CRUD ACTIONS ===============
    const addBudgetItem = (name, uid) => {
        const data = {
            uid,
            itemName,

        }
        try {
            const response = axios.post(`${API_HOST}/api/addBudgetItem`,{
                uid, itemName,
                month, year,
            })
        } catch (error) {
            
        }
    }


    return (
        <DBContext.Provider value={{
            transactions, setTransactions, getTransactions,
            budgets, setBudgets,API_HOST, month, setMonth, year, setYear,
            monthNames
        }}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContextProvider