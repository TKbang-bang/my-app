import React from "react";
import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";
import Publications from "./Publications";
import Profile from "./Profile";
import Following from "./Following";
import Publicate from "./Publicate";

function Home() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Publications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/publicate" element={<Publicate />} />
      </Routes>
      <Following />
    </main>
  );
}

export default Home;
