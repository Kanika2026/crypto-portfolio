import { usePortfolio } from "../context/PortfolioContext";

export default function Portfolio() {
  const { portfolio, removeFromPortfolio } = usePortfolio();

  const totalInvestment = portfolio.reduce(
    (sum, coin) => sum + coin.quantity * coin.buyPrice,
    0
  );

  const totalCurrentValue = portfolio.reduce(
    (sum, coin) => sum + coin.quantity * coin.currentPrice,
    0
  );

  const totalProfit = totalCurrentValue - totalInvestment;

  if (portfolio.length === 0) {
    return <h2>Your portfolio is empty.</h2>;
  }

  return (
    <div>
      <h1>My Portfolio</h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "220px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Investment</h3>
          <p>${totalInvestment.toLocaleString()}</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "220px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Current Value</h3>
          <p>${totalCurrentValue.toLocaleString()}</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "220px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Profit / Loss</h3>

          <p
            style={{
              color: totalProfit >= 0 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            ${totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Portfolio Table */}
      <table className="coin-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Current Value</th>
            <th>Profit / Loss</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {portfolio.map((coin) => {
            const currentValue = coin.quantity * coin.currentPrice;
            const invested = coin.quantity * coin.buyPrice;
            const profit = currentValue - invested;

            return (
              <tr key={coin.id}>
                <td>
                  <img
                    src={coin.image}
                    width="30"
                    alt={coin.name}
                  />{" "}
                  {coin.name}
                </td>

                <td>{coin.quantity}</td>

                <td>${coin.buyPrice}</td>

                <td>${coin.currentPrice.toLocaleString()}</td>

                <td>${currentValue.toLocaleString()}</td>

                <td
                  style={{
                    color: profit >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  ${profit.toLocaleString()}
                </td>

                <td>
                  <button
                    onClick={() => removeFromPortfolio(coin.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}