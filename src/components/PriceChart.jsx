import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function PriceChart({ prices }) {
  if (!prices || prices.length === 0) {
    return <h3>No Chart Data</h3>;
  }

  const data = {
    labels: prices.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: prices.map((price) => price[1]),
        borderColor: "#2563eb",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
}