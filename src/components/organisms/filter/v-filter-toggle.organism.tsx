import { VButton } from '@components/atoms';
import { useState, forwardRef } from 'react';
import { VFilterRef } from './v-filter.organism';

type VFilterToggleProps = {
  isFilterActive?: boolean;
  onToggleFilter?: () => void;
  filterRef: React.Ref<VFilterRef>;
};

const VFilterToggle = forwardRef<HTMLButtonElement, VFilterToggleProps>(
  ({ isFilterActive, onToggleFilter, filterRef }: VFilterToggleProps, ref) => {
    const [isActive, setIsActive] = useState<boolean>(isFilterActive ?? false);

    const toggleFilter = () => {
      setIsActive((prev) => !prev);
      // Trigger parent callback if available
      onToggleFilter && onToggleFilter();
      // Safely call toggleFilter on filterRef
      if (filterRef && 'current' in filterRef && filterRef.current) {
        filterRef.current.toggleFilter(); // Access current property for RefObject
      }
    };

    return (
      <VButton
        variant="link"
        ref={ref}
        onClick={toggleFilter}
        className="!w-32 underline underline-offset-4 hover:!bg-theme-default hover:!text-theme-brand hover:!opacity-80"
      >
        <span>{isActive ? 'Close Filters' : 'Apply Filters'}</span>
      </VButton>
    );
  }
);

export default VFilterToggle;
