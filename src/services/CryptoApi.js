import axios from "axios";

const API = "https://api.coingecko.com/api/v3";

export async function fetchMarketData() {
  const response = await axios.get(
    `${API}/coins/markets`,
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    }
  );

  return response.data;
}

export async function fetchCoinChart(id) {
  const response = await axios.get(
    `${API}/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: 7,
      },
    }
  );

  return response.data.prices.map((item) => ({
    time: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }));
}