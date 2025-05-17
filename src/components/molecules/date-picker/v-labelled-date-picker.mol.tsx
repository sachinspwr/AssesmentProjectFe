import { VLabel, VLabelProps } from '@components/atoms';
import { VDatePicker, VDatePickerProps } from './v-date-picker.mol';

type VLabelledDatePickerProps = DefaultProps &
  VLabelProps & VDatePickerProps;

function VLabelledDatePicker({ className, onChange, ...rest }: VLabelledDatePickerProps) {
  return (
    <div className=" flex flex-col gap-2">
      <VLabel {...rest} />
      {/* Use VDatePicker component here */}
      <span className="relative">
        <VDatePicker className={className} onChange={onChange} />
      </span>
    </div>
  );
}

export { VLabelledDatePicker };
