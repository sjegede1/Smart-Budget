import React from 'react'

function Transaction({transaction}) {
  // To edit transactions have them update the Database directly and then rerender the page.
  
  const addToCategory = () => {
    //TODO: Function add transaction_id to BudgetItem
  }
  const removeFromCategory = () => {
    //TODO: Function to remove category from BudgetItem
  }
  return (
    <div>
      <h3>${transaction.amount} {transaction.name} </h3>
      <p>
        Category: {transaction.personal_finance_category.primary || transaction.category[0]} <br />
        Date: {transaction.date} <br />
      </p>
      <button onClick={addToCategory}>
        Add to BudgetItem
      </button>
      <button>
        Remove from Budget Item {/*TODO: */}
      </button>
    </div>
  )
}

export default Transaction