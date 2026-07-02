import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return <h2>Your watchlist is empty.</h2>;
  }

  return (
    <div>
      <h1>My Watchlist</h1>

      <table className="coin-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {watchlist.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img
                  src={coin.image}
                  width="30"
                  alt={coin.name}
                />{" "}
                {coin.name}
              </td>

              <td>{coin.symbol.toUpperCase()}</td>

              <td>${coin.currentPrice.toLocaleString()}</td>

              <td>
                <button
                  onClick={() =>
                    removeFromWatchlist(coin.id)
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}