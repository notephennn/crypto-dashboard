import { useEffect, useState } from "react";
import axios from "axios";

export default function FearGreedCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.alternative.me/fng/")
      .then((res) => {
        setData(res.data.data[0]);
      });
  }, []);

  if (!data) return null;

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
      <h2 className="text-white text-xl font-bold mb-4">
        Fear & Greed Index
      </h2>

      <div className="text-5xl font-bold text-yellow-400">
        {data.value}
      </div>

      <p className="text-zinc-400 mt-2">
        {data.value_classification}
      </p>
    </div>
  );
}