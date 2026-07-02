import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by coin name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}