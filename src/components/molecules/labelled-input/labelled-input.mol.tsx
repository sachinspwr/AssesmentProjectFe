import { InputProps, LabelProps, VInput } from '@components/atoms';
import { VLabel } from '@components/atoms/label/v-label.atom';
import { ReactNode } from 'react';

type LabelledInputProps = LabelProps &
  InputProps & {
    label: ReactNode;
    wrapperClasses?: ClassName;
    labelClasses?: ClassName;
    inputClasses?: ClassName;
  };

function LabelledInput({
  label,
  htmlFor,
  type,
  name,
  value,
  placeholder,
  disabled,
  wrapperClasses = '',
  labelClasses,
  inputClasses,
  onChange,
}: LabelledInputProps) {
  return (
    <div className={wrapperClasses}>
      <VLabel htmlFor={htmlFor} className={`mb-2 ${labelClasses}`}>
        {label}
      </VLabel>
      <VInput
        type={type}
        name={name}
        className={inputClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? ` ${placeholder}` : ''}
        disabled={disabled}
      />
    </div>
  );
}

export { LabelledInput };
