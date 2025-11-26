import { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Passenger } from "../types/Passenger";

interface PassengerChartProps {
  data: Passenger[];
}

const PassengerChart = ({ data }: PassengerChartProps) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    data.forEach((p) => {
      const cls = p.Pclass ?? "Unknown";
      grouped[cls] = (grouped[cls] || 0) + 1;
    });

    return Object.entries(grouped).map(([pclass, count]) => ({
      pclass,
      count,
    }));
  }, [data]);

  return (
    <BarChart width={500} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="pclass" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
};

export default memo(PassengerChart);