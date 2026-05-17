export default function CryptoCard({ coin }) {
  const positive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="bg-[#121826] p-5 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-10 h-10"
        />

        <div>
          <h2 className="font-semibold">
            {coin.name}
          </h2>

          <p className="text-sm text-gray-400 uppercase">
            {coin.symbol}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-bold">
          ${coin.current_price.toLocaleString()}
        </h1>

        <p
          className={`mt-2 text-sm ${
            positive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}