import { Link } from "react-router-dom";

const expensesElements = (expenses, handleDelete) => {
  return (
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
          {expenses
            .sort(function (a, b) {
              let c = new Date(a.date);
              let d = new Date(b.date);
              return d - c;
            })
            .map((expense) => {
              return (
                <tr key={expense._id}>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>{expense.value}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(expense._id)}
                    >
                      Delete
                    </button>
                    <button>
                      <Link to={`/node-box-frontend/edit/${expense._id}`}>
                        Edit
                      </Link>
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

function ListOfExpenses({ expenses, handleDelete }) {
  return <>{expensesElements(expenses, handleDelete)}</>;
}

export default ListOfExpenses;
