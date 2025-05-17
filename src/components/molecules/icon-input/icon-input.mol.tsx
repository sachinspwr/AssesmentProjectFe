import { Icon, Input, InputProps } from '@components/atoms';
import { IconType } from 'react-icons';

type LabelledInputProps = DefaultProps &
  InputProps & {
    icon: IconType;
    iconSize?: number;
    wrapperClasses?: ClassName;
    iconClasses?: ClassName;
    inputClasses?: ClassName;
  };

function IConInput({
  type,
  name,
  value,
  placeholder,
  disabled,
  wrapperClasses = '',
  icon,
  iconSize = 16,
  iconClasses,
  inputClasses,
  onChange,
}: LabelledInputProps) {
  return (
    <div className={`relative flex items-center ${wrapperClasses}`}>
      <Icon
        icon={icon}
        size={iconSize}
        className={`absolute left-0 flex items-center mx-2 pointer-events-none  ${iconClasses}`}
      />
      <Input
        type={type}
        name={name}
        className={`pl-10 ${inputClasses}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? ` ${placeholder}` : ''}
        disabled={disabled}
      />
    </div>
  );
}

export { IConInput };
