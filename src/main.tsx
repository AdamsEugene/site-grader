import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Form1 from "./pages/Form1.tsx";
import Dashboard from "./pages/Dashboard/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Form1" element={<Form1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </StrictMode>
);
