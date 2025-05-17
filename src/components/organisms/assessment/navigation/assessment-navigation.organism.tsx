import { VButton } from '@components/atoms';
import React, { useState } from 'react';

export type AssessmentNavigationType = 'prev' | 'save-exit' | 'save-proceed';

type AssessmentNavigationProps = {
  saveProceedLabel?: string;
  isLoading?: boolean;
  isSaveDisabled?: boolean;
  onCancel?: () => void;
  onPrevious?: () => void;
  onSaveExit?: () => void;
  onSaveProceed?: () => void;
};

function AssessmentNavigation({
  isLoading = false,
  isSaveDisabled = false,
  onCancel,
  onPrevious,
  onSaveExit,
  saveProceedLabel = 'Save & Proceed',
  onSaveProceed,
}: AssessmentNavigationProps) {
  const [action, setAction] = useState<AssessmentNavigationType>('save-proceed');

  // Generalized click handler for button actions
  const handleClick = (actionType: 'prev' | 'save-exit' | 'save-proceed', callback?: () => void) => {
    setAction(actionType);
    if (callback) callback();
  };

  return (
    <div className="flex gap-5 my-8">
      {onCancel && (
        <VButton variant="secondary" className="!w-24" onClick={() => handleClick('prev', onCancel)}>
          Cancel
        </VButton>
      )}

      {onPrevious && (
        <VButton variant="secondary" className="!w-24" onClick={() => handleClick('prev', onPrevious)}>
          Prevoius
        </VButton>
      )}

      {onSaveExit && (
        <VButton
          variant="secondary"
          isLoading={action === 'save-exit' && isLoading}
          disabled={isSaveDisabled}
          className="!w-36"
          onClick={() => handleClick('save-exit', onSaveExit)}
        >
          Save & Exit
        </VButton>
      )}

      {onSaveProceed && (
        <VButton
          className="!w-44"
          disabled={isSaveDisabled}
          isLoading={action === 'save-proceed' && isLoading}
          onClick={() => handleClick('save-proceed', onSaveProceed)}
        >
          {saveProceedLabel}
        </VButton>
      )}
    </div>
  );
}

export default AssessmentNavigation;
