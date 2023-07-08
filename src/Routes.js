import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Inbox from "./components/Inbox";
import Sent from "./components/Sent";
import Compose from "./components/Compose";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/compose" element={<Compose />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
