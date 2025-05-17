// Component: Stat Card
interface VStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}

function VStatCard({ icon, title, value, trend }: VStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-start">
      <div className="mr-4 p-3 rounded-full bg-gray-50">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <div className="flex items-baseline mt-1">
          <span className="text-2xl font-bold mr-2">{value}</span>
          <span className="text-green-500 text-sm">{trend}</span>
        </div>
      </div>
    </div>
  );
}

export { VStatCard };
