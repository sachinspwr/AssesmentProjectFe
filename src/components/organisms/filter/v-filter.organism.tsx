import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { FormFieldData, VFormFields } from '@types';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CSSProperties } from 'react';

type VFilterProps = {
  filterConfig: VFormFields[];
  onApplyFilter: (filterValues: FormFieldData) => void;
  notchPositionFromLeft?: string | number;
  filterToggleRef?: React.Ref<HTMLButtonElement>;
  isSearching?: boolean;
  initiallyOpen?: boolean; // New prop to control whether the filter is initially open
};

export type VFilterRef = {
  toggleFilter: () => void;
};

const VFilter = forwardRef<VFilterRef, VFilterProps>(
  (
    {
      filterConfig,
      onApplyFilter,
      notchPositionFromLeft = 0,
      isSearching,
      filterToggleRef,
      initiallyOpen = false,
    }: VFilterProps,
    ref
  ) => {
    const [showFilter, setShowFilter] = useState<boolean>(initiallyOpen); // Use the `initiallyOpen` prop to control the state
    const notchPosition = useRef<number | string>(notchPositionFromLeft);

    useEffect(() => {
      if (filterToggleRef && 'current' in filterToggleRef && filterToggleRef.current) {
        const buttonElement = filterToggleRef.current;
        const buttonRect = buttonElement.getBoundingClientRect();
        notchPosition.current = buttonRect.left + buttonRect.width / 6;
      }
    }, [filterToggleRef]);

    const toggleFilter = () => {
      setShowFilter((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      toggleFilter,
    }));

    if (!showFilter) return null;

    const notchStyles: CSSProperties = {
      position: 'absolute',
      top: -10,
      left: notchPosition.current ?? 0,
      transform: 'translateX(-50%)',
      width: 20,
      height: 10,
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    };

    return (
      <div className="w-full relative">
        <div className="w-full relative mt-2">
          {notchPositionFromLeft && <div style={notchStyles} className="!bg-theme-highlight"></div>}
          <div className="relative p-5 rounded-xl bg-theme-highlight">
            <VDynamicForm
              spacing={3}
              config={filterConfig}
              onSubmit={onApplyFilter}
              isFormSubmitting={isSearching}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default VFilter;
