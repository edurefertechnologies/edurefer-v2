"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueItem {
  month: string;
  revenue: number;
  payments: number;
}

interface Props {
  data: RevenueItem[];
}

export default function RevenueChart({
  data,
}: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
        No revenue data available.
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              `â‚¹${Number(
                value
              ).toLocaleString("en-IN")}`
            }
          />

          <Tooltip
            formatter={(value) => [
              `â‚¹${Number(
                value
              ).toLocaleString("en-IN")}`,
              "Revenue",
            ]}
          />

          <Bar
            dataKey="revenue"
            fill="currentColor"
            className="text-primary"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
