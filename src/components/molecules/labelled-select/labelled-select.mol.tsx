import { Label, LabelProps, Select, SelectProps } from '@components/atoms';
import { ReactNode } from 'react';

type LabelledSelectProps = LabelProps &
  SelectProps & {
    label: ReactNode;
    wrapperClasses?: ClassName;
    labelClasses?: ClassName;
    onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLSelectElement>) => void;
  };

function LabelledSelect({
  name,
  label,
  htmlFor,
  value,
  options,
  disabled,
  wrapperClasses = '',
  labelClasses = '',
  className = '',
  onChange,
}: LabelledSelectProps) {
  return (
    <div className={wrapperClasses}>
      <Label htmlFor={htmlFor} className={`mb-2 ${labelClasses}`}>
        {label}
      </Label>
      <Select name={name} value={value} options={options} className={className} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export { LabelledSelect };
