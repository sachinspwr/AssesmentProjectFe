import { Input, Label } from '@components/atoms';

export type RadioOption = {
  label: string;
  value: string;
};

type RadioButtonGroupProps = DefaultProps & {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  wrapperClasses?: ClassName;
  optionContainerClasses?: ClassName;
  labelClasses?: ClassName;
  onChange: (value: string) => void;
};

function RadioButtonGroup({
  name,
  options,
  selectedValue = '',
  wrapperClasses = '',
  optionContainerClasses = '',
  labelClasses = '',
  className = '',
  onChange,
}: RadioButtonGroupProps) {
  return (
    <div className={`flex flex-col ${wrapperClasses}`}>
      {options.map((option) => (
        <div key={option.value} className={`flex items-center space-x-2 ${optionContainerClasses}`}>
          <Input
            name={name}
            value={option.value}
            type="radio"
            checked={selectedValue === option.value}
            onChange={onChange}
            className={`cursor-pointer !w-4 !h-4 ${className}`}
          />
          <Label className={`ml-2 font-normal ${labelClasses}`}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
}

export { RadioButtonGroup };
