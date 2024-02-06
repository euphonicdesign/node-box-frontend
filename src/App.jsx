import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateForm from "./components/CreateForm";
import axios from "axios";
import ListOfExpenses from "./components/ListOfExpenses";
import ExpensesTotal from "./components/ExpensesTotal";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import EditForm from "./components/EditForm";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await fetch(
        "https://node-box.onrender.com/api/v1/expenses",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // const data = await fetch("https://node-box.onrender.com/api/v1/expenses");
      const expensesData = await data.json();
      setExpenses(expensesData.expenses);
      setIsLoading(false);
    }
    if (user) {
      fetchData();
    }
  }, [requests, user]);

  async function handleDelete(id) {
    const response = await axios.delete(
      `https://node-box.onrender.com/api/v1/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    // const response = await axios.delete(
    //   `https://node-box.onrender.com/api/v1/expenses/${id}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }
    // );
    // console.log(response);
    setRequests((prev) => prev + 1);
  }

  return (
    <>
      {/* <h1>Expenses App</h1> */}
      <h2>Create expense</h2>
      <CreateForm handleRequests={setRequests} />
      <ExpensesTotal expenses={expenses} />
      <h2>List of expenses</h2>
      {isLoading && <p>Loading...</p>}
      <ListOfExpenses expenses={expenses} handleDelete={handleDelete} />
    </>
  );
}

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/node-box-frontend/"
          element={user ? <Home /> : <Navigate to="/node-box-frontend/login" />}
        />
        <Route
          path="/node-box-frontend/login"
          element={!user ? <Login /> : <Navigate to="/node-box-frontend/" />}
        />
        <Route
          path="/node-box-frontend/signup"
          element={!user ? <Signup /> : <Navigate to="/node-box-frontend/" />}
        />
        <Route path="/node-box-frontend/edit/" element={<EditForm />} />
        <Route path="/node-box-frontend/edit/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
