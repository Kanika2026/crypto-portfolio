import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import { usePortfolio } from "../context/PortfolioContext";
import { useWatchlist } from "../context/WatchlistContext";
import Loading from "../components/Loading";
import { getCoinDetails, getCoinChart } from "../services/cryptoApi";

export default function CoinDetails() {
  const { id } = useParams();
  const { addToPortfolio } = usePortfolio();
  const { addToWatchlist } = useWatchlist();

  const [coin, setCoin] = useState(null);

  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  useEffect(() => {
  async function fetchChart() {
    try {
      const data = await getCoinChart(id, days);
      setChartData(data.prices);
    } catch (error) {
      console.error(error);
    }
  }

  fetchChart();
}, [id, days]);

  if (loading) {
  return <Loading />;
}

  if (!coin) {
    return <h2>Coin not found.</h2>;
  }
  const handleAddToPortfolio = () => {
  const quantity = prompt("Enter quantity:");

  if (!quantity) return;

  const buyPrice = prompt("Enter buy price (USD):");

  if (!buyPrice) return;

  addToPortfolio({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image.small,
    currentPrice: coin.market_data.current_price.usd,
    quantity: Number(quantity),
    buyPrice: Number(buyPrice),
  });

  alert("Added to Portfolio!");
};

const handleAddToWatchlist = () => {
  addToWatchlist({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image.small,
    currentPrice: coin.market_data.current_price.usd,
  });

  alert("Added to Watchlist!");
};
  return (
    <div className="coin-details">
      <img
        src={coin.image.large}
        alt={coin.name}
        width="100"
      />

      <h1>{coin.name}</h1>

      <p
        dangerouslySetInnerHTML={{
          __html: coin.description.en.slice(0, 300) + "...",
        }}
      />

      <h3>
        Current Price:
        ${coin.market_data.current_price.usd.toLocaleString()}
      </h3>

      <h3>
        Market Cap:
        ${coin.market_data.market_cap.usd.toLocaleString()}
      </h3>

      <h3>
        ATH:
        ${coin.market_data.ath.usd.toLocaleString()}
      </h3>

      <h3>
        ATL:
        ${coin.market_data.atl.usd.toLocaleString()}
      </h3>

      <h3>
        Circulating Supply:
        {coin.market_data.circulating_supply.toLocaleString()}
      </h3>

      <h3>
        Total Supply:
        {coin.market_data.total_supply?.toLocaleString() || "N/A"}
      </h3>

      <h3>
        24h Volume:
        ${coin.market_data.total_volume.usd.toLocaleString()}
      </h3>

      <hr />

<h2>Price History</h2>

<div style={{ marginBottom: "20px" }}>
  <button onClick={() => setDays(7)}>
    7 Days
  </button>

  <button onClick={() => setDays(30)}>
    30 Days
  </button>

  <button onClick={() => setDays(90)}>
    90 Days
  </button>
</div>

<PriceChart prices={chartData} />
<br />
<br />

<button onClick={handleAddToPortfolio}>
  Add to Portfolio
</button>

<button onClick={handleAddToWatchlist}>
  Add to Watchlist
</button>
    </div>
  );
}