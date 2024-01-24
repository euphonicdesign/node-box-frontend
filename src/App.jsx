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

  const expensesElement = expenses.map((expense) => {
    return (
      <li key={expense._id} className="list-item">
        <span>
          {" "}
          {expense.date} {expense.description} {expense.value}{" "}
          {expense.category}
        </span>
        <button onClick={() => handleDelete(expense._id)}>Delete</button>
      </li>
    );
  });

  return (
    <>
      <h1>Expenses App</h1>
      {expenses.length == 0 && <p>Loading...</p>}
      <h2>List of expenses</h2>
      <ul className="expenses-list">{expensesElement}</ul>
      <h2>Create expense</h2>
      <CreateForm handleRequests={setRequests} />
    </>
  );
}

export default App;
