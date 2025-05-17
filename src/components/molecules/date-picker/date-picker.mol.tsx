import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

type DatePickerProps = DefaultProps & {
  onChange: (selectedDate: Date) => void;
};

function DatePicker({ className, onChange }: DatePickerProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    onChange(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker classNames={className} onChange={handleChange} show={show} setShow={handleClose} />
    </div>
  );
}

export { DatePicker };
