import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type PieChartDataWithPercentage = {
  name: string;
  value: number;
  percentage: number;
};

type VPieGraphProps = {
  data: PieChartDataWithPercentage[];
};

const COLORS = ['#FCA9AB', '#FED8D7', '#7DBEFF', '#75A9DC'];

function VPieGraph({ data }: VPieGraphProps) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth * 0.36);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Guard: return null if no data
  if (!data || data.length === 0) return null;

  return (
    <PieChart width={width} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
        labelLine={false}
        label={({ name, percentage }) => `${name} (${percentage}%)`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export { VPieGraph };
