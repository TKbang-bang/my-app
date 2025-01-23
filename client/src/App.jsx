import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Router from "./Router";
import ThisPub from "./pages/ThisPub";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/verify`).then((res) => {
        if (!res.data.log) {
          if (window.location != `http://localhost:5173/signup`)
            navigate("/login");
        }
      });
    } catch (error) {
      //  TO SOLVE
      console.log(error);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<Router />} />
        <Route path="/pub" element={<ThisPub />} />
      </Routes>
    </>
  );
}

export default App;
