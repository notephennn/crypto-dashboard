import axios from "axios";

const API =
  "https://api.coingecko.com/api/v3/coins/markets";

export async function fetchCrypto() {
  const res = await axios.get(API, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });

  return res.data;
}