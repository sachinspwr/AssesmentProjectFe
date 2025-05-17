import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

type VPieGraphprops = DefaultProps & {

};
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#FCA9AB', '#FED8D7', '#7DBEFF', '#75A9DC'];
function VPieGraph({

}: VPieGraphprops) {
       const [width, setWidth] = useState<number>(0);
        useEffect(() => {
          // Function to calculate and set the width
          const updateWidth = () => {
            setWidth(window.innerWidth * 0.36); // 30% of the screen width
          };

          updateWidth(); // Set the initial width
          window.addEventListener("resize", updateWidth); // Update width on resize

          // Cleanup the event listener on component unmount
          return () => window.removeEventListener("resize", updateWidth);
        }, []);
  return (
    <>
        <PieChart width={width} height={200}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        </PieChart>
    </>
  );
}

export { VPieGraph };