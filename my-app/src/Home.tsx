import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="card">
        <h1>Bem-vindo à Gestão de Livros e Autores</h1>
        <p>Gerencie seus livros e autores com facilidade.</p>
        <div className="button-container">
          <Link to="/books" className="button">Gerenciar Livros</Link>
          <Link to="/authors" className="button">Gerenciar Autores</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
