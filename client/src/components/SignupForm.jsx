import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupForm({ message }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [see, setSee] = useState(false);

  const handleSee = () => {
    if (see) {
      document.querySelector(".log form .pass input").type = "password";
      setSee(false);
    } else {
      document.querySelector(".log form .pass input").type = "text";
      setSee(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (name != "" || email != "" || password != "") {
        axios
          .post(`http://localhost:3000/signup`, {
            name,
            email,
            password,
          })
          .then((res) => {
            if (res.data.ok) {
              setEmail("");
              setName("");
              setPassword("");
              message("ok");
            } else {
              alert(res.data.message);
            }
          });
      } else {
        alert("Fill all the areas");
      }
    } catch (error) {
      //  TO SOLVE
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <article className="pass">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label onClick={handleSee}>{see ? "Hide" : "See"}</label>
      </article>
      <button type="submit">Sign up</button>
      <p>
        Do you already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </form>
  );
}

export default SignupForm;
