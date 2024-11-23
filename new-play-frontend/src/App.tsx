import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./page/Dashboard";
import CreateRoom from "./page/CreateRoom";
import CreateVideo from "./page/CreateVideo";
import ListVideo from "./page/ListVideo";
import Rooms from "./page/Rooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Listvideo" element={<ListVideo />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CreateRoom" element={<CreateRoom />} />
        <Route path="/Room" element={<Rooms />} />
        <Route path="/CreateVideo" element={<CreateVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
