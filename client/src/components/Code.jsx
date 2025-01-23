import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Code() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`http://localhost:3000/code`, { code }).then((res) => {
        if (res.data.ok) {
          navigate("/");
        } else {
          alert(res.data.message);
        }
      });
    } catch (error) {
      //  TO SOLVE
      console.log(error);
    }
  };

  return (
    <form className="code" onSubmit={handleSubmit}>
      <h1>Verify your gmail</h1>
      <input
        type="text"
        placeholder="Enter the code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Send code</button>
    </form>
  );
}

export default Code;
