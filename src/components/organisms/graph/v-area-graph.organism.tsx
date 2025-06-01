import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type VAreaGraphprops = DefaultProps & {

};
const data = [
    {
      "name": "page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
function VAreaGraph({

}: VAreaGraphprops) {
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
   <AreaChart width={width} height={250} data={data} className='w-3/6' 
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="pv" stroke="#0064C73" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    </>
  );
}

export { VAreaGraph };