import React, { useContext } from 'react'
import { DBContext } from '../../contexts/db_context'

function BudgetItem({ budgetItem }) {
  const {API_HOST} = useContext(DBContext)
  const [itemInfo, setItemInfo] = useState(
    {
      name: "Category",
      year: "",
      month: "",
      target: 0,
      actual: 0, // sum of transactions
      transactions: [],
    }
  )

  const handleChange = (e) => {
    setItemInfo({
      ...itemInfo,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: BudgetItem submit route
      const response = await axios.post(`${API_HOST}/api/budget-item`, itemInfo)
      console.log('Submitted Budget Item', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      // TODO: BudgetItem delete route
      const response = await axios.delete(`${API_HOST}/api/budget-item`, itemInfo)
      console.log('Deleted Budget Item', response.data)
    } catch (error) {
      console.error(error)
    }
  }


  useState(
    setItemInfo(budgetItem)
  ,[])
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" id="name" defaultValue={budgetItem.name} onChange={handleChange} />
      <input type="text" name="year" id="year" defaultValue={budgetItem.year} onChange={handleChange} />
      <input type="text" name="month" id="month" defaultValue={budgetItem.month} onChange={handleChange} />
      <input type="text" name="target" id="target" defaultValue={budgetItem.target} onChange={handleChange} />
      <input type="text" name="actual" id="actual" defaultValue={budgetItem.actual} onChange={handleChange} />
      <input type="submit" value="submit" />
      <input type="submit" value="delete" />
    </form>
  )
}

export default BudgetItem