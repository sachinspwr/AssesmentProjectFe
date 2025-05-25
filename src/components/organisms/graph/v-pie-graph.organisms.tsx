import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

type VPieGraphprops = DefaultProps & {
  data:{name:string;value:number}[];
};
const dummyData = [
  { name: 'Group A', value: 40 },
  { name: 'Group B', value: 30 },
  { name: 'Group C', value: 30 },
  { name: 'Group D', value: 20 },
];
const COLORS = ['#FCA9AB', '#FED8D7', '#7DBEFF', '#75A9DC'];
function VPieGraph({data=dummyData}: VPieGraphprops) {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth * 0.36);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return (
    <PieChart width={width} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
        labelLine={true}
        label={({ name, value }) => `${name}\n${value}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export { VPieGraph };
