const expensesElements = (expenses) => {
  return (
    // <li key={expense._id} className="list-item">
    //   <div className="expense-elements">
    //     <div>{expense.date}</div>
    //     <div>{expense.description}</div>
    //     <div>{expense.value}</div>
    //     <div>{expense.category}</div>
    //   </div>
    //   <button onClick={() => handleDelete(expense._id)}>Delete</button>
    // </li>
    <div className="expenses-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <tr key={expense._id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.value}</td>
                <td>{expense.category}</td>
                <td>
                  <button onClick={() => handleDelete(expense._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function ListOfExpenses({ expenses }) {
  return (
    <>
      <ul className="expenses-list">{expensesElements(expenses)}</ul>
    </>
  );
}

export default ListOfExpenses;
