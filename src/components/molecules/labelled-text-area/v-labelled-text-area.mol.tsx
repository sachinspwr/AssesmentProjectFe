import {  LabelProps } from '@components/atoms';
import { VLabel } from '@components/atoms/label/v-label.atom';
import { VTextArea, VTextAreaProps } from '@components/atoms/text-area/v-text-area.atom';
import { ReactNode } from 'react';

type VLabelledTextAreaProps = LabelProps &
  VTextAreaProps & {
    label: ReactNode;
    wrapperClasses?: ClassName;
    labelClasses?: ClassName;
    inputClasses?: ClassName;
    mode?: 'view' | 'edit';
    pageChildren?: React.ReactNode;
  };

function VLabelledTextArea({
  label,
  htmlFor,
  name,
  value,
  placeholder,
  rows,
  disabled,
  reflectErrors,
  wrapperClasses = '',
  labelClasses,
  inputClasses,
  mode = 'edit',
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
        mode={mode}
      />
    </div>
  );
}

export { VLabelledTextArea };
