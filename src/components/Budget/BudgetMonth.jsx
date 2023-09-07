import React, { useContext } from 'react'
import { DBContext } from '../../contexts/db_context'

function BudgetMonth() {
    const {setMonth, setYear, month, year} = useContext(DBContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(month, year)
        setMonth(parseInt(e.target.month.value))
        setYear(parseInt(e.target.year.value))
      }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="month" id="month" placeholder='month' />
            <input type="number" setp="1" name="year" id="year" placeholder="year" defaultValue={2023} />
            <input type="submit" value="change date" />
        </form>
    )
}

export default BudgetMonth