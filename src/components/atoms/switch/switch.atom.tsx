import React, { useState } from 'react';

type SwitchProps = DefaultProps & {
  label?: string;
  onChange: (isToggled: boolean) => void;
};

function Switch({ label, onChange, className }: SwitchProps) {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onChange(!isToggled);
  };

  return (
    <label className={`w-full inline-flex justify-between items-center cursor-pointer ${className}`}>
      {label && <span className="mx-2">{label}</span>}
      <input type="checkbox" value="" checked={isToggled} className="sr-only peer mx-2" onChange={handleToggle} />
      <div
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
           peer-focus:ring-gray-300 dark:peer-focus:ring-gray-300 rounded-full peer
           dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
           peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
           after:bg-skin-theme after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
           after:transition-all dark:border-gray-600 peer-checked:bg-skin-theme-invert"
      ></div>
    </label>
  );
}

export { Switch };
