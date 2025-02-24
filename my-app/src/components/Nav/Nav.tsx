import React from "react";
import { Link } from "react-router-dom"; // Importação do React Router
import { Library } from "lucide-react"; // Ícone da biblioteca
import styles from "./Nav.module.css";

const Nav: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Library className={styles.navbar__icon} />
        <h1 className={styles.navbar__logo__title}>Bookstore</h1>
      </div>
      <div className={styles.navbar__links}>
        <Link to="/books" className={styles.navbar__link}>Livros</Link>
        <Link to="/authors" className={styles.navbar__link}>Autores</Link>
      </div>
    </nav>
  );
};

export default Nav;
