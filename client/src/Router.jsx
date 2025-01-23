import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/sessions/Signup";
import Login from "./pages/sessions/Login";

function Router() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Router;
