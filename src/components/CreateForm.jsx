import { useState } from "react";
import axios from "axios";
import "./CreateForm.css";

const resetFormDetails = () => {
  return {
    date: "2024-01-01",
    description: "",
    value: "",
    category: "",
  };
};

function CreateForm({ handleRequests }) {
  const [formDetails, setFormDetails] = useState(resetFormDetails());

  // const [date, setDate] = useState("2024-01-01");
  // const [description, setDescription] = useState("");
  // const [value, setValue] = useState("");
  // const [category, setCategory] = useState("");

  function handleInput(e) {
    setFormDetails({
      ...formDetails,
      [e.target.id]: e.target.value,
    });
    // if (e.target.id === "date") setDate(e.target.value);
    // if (e.target.id === "description") setDescription(e.target.value);
    // if (e.target.id === "value") setValue(e.target.value);
    // if (e.target.id === "category") setCategory(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(
      "https://node-box.onrender.com/api/v1/expenses",
      formDetails
    );
    // console.log(response);
    setFormDetails(resetFormDetails());

    handleRequests((prev) => prev + 1);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={formDetails.date}
          onChange={handleInput}
          id="date"
        />
        <input
          id="description"
          type="text"
          placeholder="description"
          value={formDetails.description}
          onChange={handleInput}
        />
        <input
          id="value"
          type="text"
          placeholder="value"
          value={formDetails.value}
          onChange={handleInput}
        />
        <select
          name="category"
          id="category"
          value={formDetails.category}
          onChange={handleInput}
        >
          <option value="">Select a category</option>
          <option value="learning">Learning</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateForm;
