import { createContext, useContext, useEffect, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (coin) => {
    setPortfolio((prev) => [...prev, coin]);
  };

  const removeFromPortfolio = (id) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addToPortfolio,
        removeFromPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}