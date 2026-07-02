import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import Watchlist from "../pages/Watchlist";
import CoinDetails from "../pages/CoinDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/coin/:id" element={<CoinDetails />} />
    </Routes>
  );
}