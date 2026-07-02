import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopCoins } from "../services/cryptoApi";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/Loading";
import {
  FaCoins,
  FaChartLine,
  FaDollarSign,
} from "react-icons/fa";

import { FaArrowTrendUp } from "react-icons/fa6";

export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
  async function fetchCoins() {
    try {
      const data = await getTopCoins();
      setCoins(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch cryptocurrency data.");
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch
  fetchCoins();

  // Refresh every 30 seconds
  const interval = setInterval(fetchCoins, 30000);

  // Cleanup when component unmounts
  return () => clearInterval(interval);
}, []);

  // Filter coins by name or symbol
  const filteredCoins = coins.filter(
  (coin) =>
    coin.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase()) ||
    coin.symbol
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
);
const totalCoins = filteredCoins.length;

const totalMarketCap = filteredCoins.reduce(
  (sum, coin) => sum + coin.market_cap,
  0
);

const averagePrice =
  filteredCoins.length > 0
    ? filteredCoins.reduce(
        (sum, coin) => sum + coin.current_price,
        0
      ) / filteredCoins.length
    : 0;

const topGainer =
  filteredCoins.length > 0
    ? filteredCoins.reduce((max, coin) =>
        coin.price_change_percentage_24h >
        max.price_change_percentage_24h
          ? coin
          : max
      )
    : null;

  if (loading) {
  return <Loading />;
}

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Top 50 Cryptocurrencies</h1>
     <div className="dashboard-stats">

  <div className="stat-card blue">
    <FaCoins size={35} />
    <h3>Total Coins</h3>
    <p>{totalCoins}</p>
  </div>

  <div className="stat-card green">
    <FaChartLine size={35} />
    <h3>Market Cap</h3>
    <p>${(totalMarketCap / 1e12).toFixed(2)}T</p>
  </div>

  <div className="stat-card orange">
    <FaDollarSign size={35} />
    <h3>Average Price</h3>
    <p>${averagePrice.toFixed(2)}</p>
  </div>

  <div className="stat-card purple">
    <FaArrowTrendUp size={35} />
    <h3>Top Gainer</h3>

    <p>{topGainer?.name}</p>

    <small>
      {topGainer?.price_change_percentage_24h.toFixed(2)}%
    </small>
  </div>

</div>

      <SearchBar search={search} setSearch={setSearch} />
       <div className="table-container"></div>
      <table className="coin-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>

              <td>
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="35"
                  height="35"
                />
              </td>

              <td>
                <Link
                  to={`/coin/${coin.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "bold",
                  }}
                >
                  {coin.name}
                </Link>
              </td>

              <td>{coin.symbol.toUpperCase()}</td>

              <td style={{ fontWeight: "600" }}>
                 ${coin.current_price.toLocaleString()}
              </td>

              <td
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>

              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}