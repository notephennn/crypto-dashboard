import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

export default function PriceChart({ data }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 h-[400px]">
      <h2 className="text-white text-xl font-semibold mb-4">
        Price Chart
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <XAxis
            dataKey="time"
            tick={{ fill: "#999", fontSize: 12 }}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#eab308"
            fill="#eab30833"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}