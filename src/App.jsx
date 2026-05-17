import { useEffect, useState } from "react";
import { fetchCrypto } from "./services/cryptoApi";
import CryptoCard from "./components/CryptoCard";

export default function App() {
  const [coins, setCoins] = useState([]);

  async function loadData() {
    const data = await fetchCrypto();
    setCoins(data);
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Crypto Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Realtime cryptocurrency analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coins.map((coin) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
          />
        ))}
      </div>
    </div>
  );
}