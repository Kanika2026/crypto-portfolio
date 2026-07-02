import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        💰 Crypto Portfolio
      </div>

      <nav className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/watchlist">Watchlist</Link>
      </nav>
    </header>
  );
}