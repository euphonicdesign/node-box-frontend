import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const urlBase = "https://node-box.onrender.com/api/v1/expenses";
// const urlBase = "http://localhost/api/v1/expenses";

const EditForm = ({ test }) => {
  const [fieldsData, setFieldsData] = useState(null);
  const { user } = useAuthContext();

  // console.log(test);
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const url = `${urlBase}/${id}`;

  const fetchData = async () => {
    // console.log("Fetching Edit Form Data...");
    if (!user) {
      return;
    }
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(data.data.expense);
    setFieldsData(data.data.expense);
    // console.log(fieldsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleInput(e) {
    setFieldsData({
      ...fieldsData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      return;
    }
    const response = await axios.patch(url, fieldsData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(response);
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={fieldsData?.date}
            id="date"
            onChange={handleInput}
          />
          <input
            id="description"
            type="text"
            placeholder="description"
            value={fieldsData?.description}
            onChange={handleInput}
          />
          <input
            id="value"
            type="text"
            placeholder="value"
            value={fieldsData?.value}
            onChange={handleInput}
          />
          <select
            name="category"
            id="category"
            value={fieldsData?.category}
            onChange={handleInput}
          >
            <option value="">Select a category</option>
            <option value="learning">Learning</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
          <button style={{ display: "block" }}>Save</button>
        </form>
      </div>

      <Link to="/node-box-frontend/">
        <h2>Back Home</h2>
      </Link>
    </>
  );
};

export default EditForm;
