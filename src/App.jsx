import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateForm from "./components/CreateForm";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://node-box.onrender.com/api/v1/expenses");
      const expensesData = await data.json();
      setExpenses(expensesData.expenses);
    }
    fetchData();
  }, [requests]);

  async function handleDelete(id) {
    const response = await axios.delete(
      `https://node-box.onrender.com/api/v1/expenses/${id}`
    );
    // console.log(response);
    setRequests((prev) => prev + 1);
  }

  const expensesElements = () => {
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

  return (
    <>
      <h1>Expenses App</h1>
      {expenses.length == 0 && <p>Loading...</p>}
      <h2>List of expenses</h2>
      <ul className="expenses-list">{expensesElements()}</ul>
      <h2>Create expense</h2>
      <CreateForm handleRequests={setRequests} />
    </>
  );
}

export default App;
