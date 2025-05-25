import { VImage } from "@components/atoms";

type VActionTileProps = {
  title: string;
  imageSrc: string;
  onClick?: () => void;
  className?: string;
};

export function VActionTile({ title, imageSrc, onClick, className = '' }: VActionTileProps) {
  return (
    <div 
      className={`
        flex flex-col items-center justify-center
        p-4 border border-theme-primary rounded-xl
        shadow-none hover:shadow-sm
        transition-all duration-200
        w-[200px] h-[200px]
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <VImage 
        src={imageSrc} 
        alt={title} 
        className="w-16 h-16 object-contain mb-3" 
      />
      <span className="text-center font-medium text-theme-brand">
        {title}
      </span>
    </div>
  );
}