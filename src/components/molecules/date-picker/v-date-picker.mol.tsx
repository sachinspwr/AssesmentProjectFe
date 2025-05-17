import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { IOptions } from 'tailwind-datepicker-react/types/Options';

type DefaultProps = {
  className?: string;
};

export type VDatePickerProps = DefaultProps & {
  value?: Date; // New prop for controlled value
  onChange: (selectedDate: Date) => void;
};

function VDatePicker({ className, value, onChange }: VDatePickerProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (selectedDate: Date) => {
    onChange(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const options: IOptions = {
    title: 'Select Date',
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    theme: {
      background: 'bg-theme-default',
      todayBtn: 'bg-theme-primary text-theme-on-primary hover:!bg-theme-primary-hover',
      clearBtn:
        'bg-theme-secondary text-theme-on-secondary hover:text-theme-on-secondary-hover hover:bg-theme-secondary-hover',
      icons: '!text-theme-brand',
      text: 'text-theme-default',
      disabledText: 'text-theme-default-disabled',
      input: 'py-2 text-md bg-theme-default text-theme-default',
      inputIcon: '!text-theme-secondary', // Added inputIcon
      selected: 'bg-theme-primary text-theme-on-primary',
    },
  };

  return (
    <div className={`bg-theme-default ${className || ''}`}>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
        classNames="text-md text-theme-default"
        value={value} // Pass the value prop to Datepicker
      />
    </div>
  );
}

export { VDatePicker };