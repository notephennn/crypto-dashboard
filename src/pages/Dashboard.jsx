import { useEffect, useState } from "react";

import CryptoCard from "../components/CryptoCard";
import MarketTable from "../components/MarketTable";
import PriceChart from "../components/PriceChart";
import FearGreedCard from "../components/FearGreedCard";
import AISignalCard from "../components/AISignalCard";

import {
  fetchCoinChart,
  fetchMarketData,
} from "../services/cryptoApi";

export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chart, setChart] = useState([]);

  async function loadData() {
    try {
      const market = await fetchMarketData();

      setCoins(market);

      if (!selected && market.length > 0) {
        setSelected(market[0]);
      }
    } catch (error) {
      console.error("Failed to load market data:", error);
    }
  }

  async function loadChart() {
    try {
      if (!selected) return;

      const data = await fetchCoinChart(selected.id);

      setChart(data);
    } catch (error) {
      console.error("Failed to load chart:", error);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadChart();
  }, [selected]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Real-Time Crypto Dashboard
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Institutional-grade cryptocurrency analytics platform
            powered by real-time and historical market data.
          </p>
        </div>

        {/* MARKET INSIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <FearGreedCard />

          <AISignalCard />

        </div>

        {/* MARKET OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {coins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* CHART */}
        <div className="mb-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-3xl font-bold">
                Price Chart
              </h2>

              <p className="text-zinc-400 mt-2">
                Real-time cryptocurrency price movement and
                short-term market trend analysis.
              </p>
            </div>

            {selected && (
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selected.name}
                  </h3>

                  <p className="text-zinc-500 uppercase">
                    {selected.symbol}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-400">
                    $
                    {selected.current_price?.toLocaleString()}
                  </div>

                  <div
                    className={`mt-1 text-sm font-medium ${
                      selected.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selected.price_change_percentage_24h?.toFixed(2)}%
                  </div>
                </div>
              </div>
            )}

            <PriceChart data={chart} />
          </div>
        </div>

        {/* MARKET TABLE */}
        <div className="mb-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-3xl font-bold">
                Market Overview
              </h2>

              <p className="text-zinc-400 mt-2">
                Top cryptocurrency assets ranked by market capitalization,
                liquidity, and market performance.
              </p>
            </div>

            <MarketTable data={coins} />

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-zinc-800 pt-6 mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <div>
            <h3 className="text-lg font-semibold">
              Hybrid Data Architecture
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Combining historical analytics with real-time crypto market updates.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm text-zinc-400">
              Live Market Data
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm text-zinc-400">
              AI Forecasting
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm text-zinc-400">
              Fear & Greed Index
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm text-zinc-400">
              Institutional UI
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}