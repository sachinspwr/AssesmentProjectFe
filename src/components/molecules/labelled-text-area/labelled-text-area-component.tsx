import { InputProps, Label, LabelProps, TextArea } from '@components/atoms';
import { ReactNode } from 'react';

type LabelledTextAreaProps = LabelProps &
  InputProps & {
    label: ReactNode;
    rows?: number
    wrapperClasses?: ClassName;
    labelClasses?: ClassName;
    inputClasses?: ClassName;
  };

function LabelledTextArea({
  label,
  htmlFor,
  name,
  value,
  placeholder,
  rows = 5,
  disabled,
  wrapperClasses = '',
  labelClasses,
  inputClasses,
  onChange,
}: LabelledTextAreaProps) {
  return (
    <div className={wrapperClasses}>
      <Label htmlFor={htmlFor} className={`mb-2 ${labelClasses}`}>
        {label}
      </Label>
      <TextArea
        rows={rows}
        name={name}
        className={inputClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export { LabelledTextArea };
