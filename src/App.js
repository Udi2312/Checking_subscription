import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_page from "./components/Home_page";
import Unauthorized_page from "./components/Unauthorized_page";
import Private_page from "./components/Private_page";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/unauthorized" element={<Unauthorized_page />} />
          <Route path="/private" element={<Private_page />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
