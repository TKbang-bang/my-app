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
      axios.get(process.env.SERVERURL + "/verify").then((res) => {
        if (!res.data.log) {
          if (window.location != process.env.CURRENTURL + "/signup")
            navigate("/signin");
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
