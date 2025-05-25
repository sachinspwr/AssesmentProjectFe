
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



type VBarChartprops = {
  data:{name:string;value:number}[];
};

const VBarChartGraph = ({data}:VBarChartprops) => {
  return (
    <BarChart
      width={550}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  );
};

export default VBarChartGraph;
