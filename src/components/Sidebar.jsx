import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaStar,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>

      <ul className="sidebar-menu">
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/portfolio"
            className={
              location.pathname === "/portfolio"
                ? "active"
                : ""
            }
          >
            <FaWallet />
            Portfolio
          </Link>
        </li>

        <li>
          <Link
            to="/watchlist"
            className={
              location.pathname === "/watchlist"
                ? "active"
                : ""
            }
          >
            <FaStar />
            Watchlist
          </Link>
        </li>
      </ul>
    </aside>
  );
}