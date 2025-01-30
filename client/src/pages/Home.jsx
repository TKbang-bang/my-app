import React from "react";
import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";
import Publications from "./Publications";
import Profile from "./Profile";
import Following from "./Following";
import Publicate from "./Publicate";
import ThisPub from "./ThisPub";

function Home() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Publications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/publicate" element={<Publicate />} />
        <Route path="/publication/:pubid" element={<ThisPub />} />
      </Routes>
      <Following />
    </main>
  );
}

export default Home;
