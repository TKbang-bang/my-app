import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [see, setSee] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://localhost:3000/login`, { email, password })
        .then((res) => {
          if (res.data.ok) {
            navigate("/");
          } else {
            alert(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSee = () => {
    if (see) {
      document.querySelector(".log form .pass input").type = "password";
      setSee(false);
    } else {
      document.querySelector(".log form .pass input").type = "text";
      setSee(true);
    }
  };

  return (
    <section className="log">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <button type="submit">Log in</button>
        <p>
          Don't you have an account yet? <Link to={"/signup"}>Sign up</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
