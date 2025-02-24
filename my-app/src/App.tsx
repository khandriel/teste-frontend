import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookManagement from "./components/Nav/BookManagement";
import AuthorManagement from "./components/Nav/AuthorManagement";
import Nav from "./components/Nav/Nav";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <Router>
      < Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookManagement />} />
        <Route path="/authors" element={< AuthorManagement />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

