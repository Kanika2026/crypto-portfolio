import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getTopCoins = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
};

export const getCoinDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCoinChart = async (id, days = 7) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
      },
    }
  );

  return response.data;
};