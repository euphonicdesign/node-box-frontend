import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateForm from "./components/CreateForm";
import axios from "axios";
import ListOfExpenses from "./components/ListOfExpenses";
import ExpensesTotal from "./components/ExpensesTotal";

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

  return (
    <>
      <h1>Expenses App</h1>
      <h2>Create expense</h2>
      <CreateForm handleRequests={setRequests} />
      <ExpensesTotal expenses={expenses} />
      <h2>List of expenses</h2>
      {expenses.length == 0 && <p>Loading...</p>}
      <ListOfExpenses expenses={expenses} />
    </>
  );
}

export default App;
