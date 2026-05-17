export default function MarketTable({ data }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-zinc-800 text-zinc-300 text-sm">
          <tr>
            <th className="p-4 text-left">Coin</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">24h</th>
            <th className="p-4 text-left">Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {data.map((coin) => (
            <tr
              key={coin.id}
              className="border-t border-zinc-800"
            >
              <td className="p-4 flex items-center gap-3">
                <img
                  src={coin.image}
                  className="w-6 h-6"
                />

                <div>
                  <p className="text-white">
                    {coin.name}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </td>

              <td className="p-4 text-white">
                ${coin.current_price.toLocaleString()}
              </td>

              <td
                className={`p-4 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>

              <td className="p-4 text-zinc-300">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}