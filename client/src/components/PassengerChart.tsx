import { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Passenger, PassengerColumn } from "../types/Passenger";
import { capitalize, mapPort, mapTicket } from "../utils/common";

interface PassengerChartProps {
  data: Passenger[];
  option: PassengerColumn;
}

const PassengerChart = ({ data, option }: PassengerChartProps) => {
  
  const formatXAxisTick = (tick: string) => {
    switch (option) {
      case 'Sex':
        return capitalize(tick);
      case 'Pclass':
        return mapTicket(Number(tick));
      case 'Embarked':
        return mapPort(tick);
      default:
        return tick;
    }
  };

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    data.forEach((p) => {
      const cls = p[option] ?? "Unknown";
      grouped[cls] = (grouped[cls] || 0) + 1;
    });

    return Object.entries(grouped).map(([column, count]) => ({
      column,
      count,
    }));
  }, [data, option]);

  return (
    <BarChart width={500} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="column" tickFormatter={formatXAxisTick} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
};

export default memo(PassengerChart);