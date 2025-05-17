interface VActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  accentClass?: string;
}

function VActionCard({
  icon,
  title,
  description,
  link,
  buttonText,
  accentClass = 'bg-gray-50 border-gray-200',
}: VActionCardProps) {
  return (
    <div className={`border rounded-xl overflow-hidden ${accentClass}`}>
      <div className="p-6">
        <div className="flex items-start">
          <div className="mr-4 p-2 rounded-lg bg-white shadow-xs">{icon}</div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 mt-1 text-sm">{description}</p>
          </div>
        </div>
        <a
          href={link}
          className="mt-4 inline-block px-4 py-2 bg-white border text-sm font-medium rounded-lg shadow-xs hover:bg-gray-50"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export {VActionCard}