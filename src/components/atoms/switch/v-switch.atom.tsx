import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

type VSwitchProps = DefaultProps & {
  name?: string;
  value?: string; // Accepts string values like "true" or "false"
  required?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelClasses?: string;
  checked?: boolean;
  type?: 'default' | 'primary' | 'positive' | 'negative' | 'warning';
  onChange?: (
    value: string, // Returns string "true" or "false"
    originalEvent?: ChangeEvent<HTMLInputElement>
  ) => void;
};

function VSwitch({
  name,
  value,
  required,
  disabled,
  label,
  labelClasses = '',
  checked,
  onChange,
  type = 'primary',
  className,
}: VSwitchProps) {
  // Convert value to boolean (default to false if undefined)
  const [isToggled, setIsToggled] = useState<boolean>(checked ?? value === 'true');

  useEffect(() => {
    setIsToggled(checked ?? value === 'true');
  }, [checked, value]);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsToggled(newValue);
    onChange && onChange(newValue.toString(), e); // Convert back to string "true"/"false"
  };

  const getSwitchClasses = () => {
    let classes = 'relative w-11 h-6 rounded-full transition-all duration-300 ';
    switch (type) {
      case 'default':
        classes += 'bg-theme-muted peer-checked:bg-theme-default-dark peer-focus:ring-theme-default-alt';
        break;
      case 'positive':
        classes += 'bg-theme-muted peer-checked:bg-theme-positive peer-focus:ring-theme-positive-lite';
        break;
      case 'negative':
        classes += 'bg-theme-muted peer-checked:bg-theme-negative peer-focus:ring-theme-negative-lite';
        break;
      case 'warning':
        classes += 'bg-theme-muted peer-checked:bg-theme-warning peer-focus:ring-theme-warning-lite';
        break;
      case 'primary':
        classes += 'bg-theme-muted peer-checked:bg-theme-primary peer-focus:ring-theme-primary-lite';
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      {label && <span className={`mr-3 text-theme-secondary ${labelClasses}`}>{label}</span>}
      <input
        type="checkbox"
        name={name}
        checked={isToggled}
        required={required}
        disabled={disabled}
        className="sr-only peer"
        onChange={handleToggle}
      />
      <div
        className={`${getSwitchClasses()} peer-focus:ring-4 
                    after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-theme-default 
                    after:border after:rounded-full after:h-5 
                    after:w-5 after:transition-all 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full`}
      ></div>
    </label>
  );
}

export { VSwitch };
