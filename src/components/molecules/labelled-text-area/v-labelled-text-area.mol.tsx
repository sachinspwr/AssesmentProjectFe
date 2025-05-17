import { InputProps, LabelProps } from '@components/atoms';
import { VLabel } from '@components/atoms/label/v-label.atom';
import { VTextArea, VTextAreaProps } from '@components/atoms/text-area/v-text-area.atom';
import { ReactNode } from 'react';

type VLabelledTextAreaProps = LabelProps &
  VTextAreaProps & {
    label: ReactNode;
    rows?: number;
    wrapperClasses?: ClassName;
    labelClasses?: ClassName;
    inputClasses?: ClassName;
  };

function VLabelledTextArea({
  label,
  htmlFor,
  name,
  value,
  placeholder,
  rows = 5,
  disabled,
  reflectErrors,
  wrapperClasses = '',
  labelClasses,
  inputClasses,
  onChange,
}: VLabelledTextAreaProps) {
  return (
    <div className={`w-full ${wrapperClasses}`}>
      <VLabel htmlFor={htmlFor} className={`mb-2 ${labelClasses}`}>
        {label}
      </VLabel>
      <VTextArea
        rows={rows}
        name={name}
        className={inputClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={true}
        reflectErrors = {reflectErrors}
      />
    </div>
  );
}

export { VLabelledTextArea };
