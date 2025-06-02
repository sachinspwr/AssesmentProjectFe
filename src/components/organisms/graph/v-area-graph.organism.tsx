// VAreaGraph.tsx
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type VAreaGraphProps = {
  data: any[]; // chart data
  xKey?: string; // default: "name"
  yKey?: string; // default: "participants"
};

function VAreaGraph({ data, xKey = 'name', yKey = 'participants' }: VAreaGraphProps) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth * 0.36);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <AreaChart width={width} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0064C7" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#0064C7" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={xKey} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey={yKey} stroke="#0064C7" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  );
}

export { VAreaGraph };
