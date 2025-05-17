import React from 'react';
import { VDropdown, VDropdownProps } from './v-dropdown.mol';
import { VLabel } from '@components/atoms/label/v-label.atom';

type VLabelledDropdownProps = VDropdownProps & {
  label: React.ReactNode;
  labelClasses?: string;
};

function VLabelledDropdown(props: VLabelledDropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      <VLabel className={`${props.labelClasses}`}>{props.label}</VLabel>
      <VDropdown {...props} />
    </div>
  );
}

export { VLabelledDropdown };
