import { IConButton } from '@components/molecules';
import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoMdSave } from 'react-icons/io';

type NavigationButtonsProps = DefaultProps & {
  onSubmit: () => void;
  onNext: () => void;
  onBack: () => void;
  isBackDisabled?: boolean;
  isSubmitDisabled?: boolean;
  isNextDisabled?: boolean;
  isLastQuestion?: boolean;
};

function NavigationButtons({
  onSubmit,
  onNext,
  onBack,
  isBackDisabled,
  isSubmitDisabled,
  isNextDisabled,
  isLastQuestion,
  className,
}: NavigationButtonsProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <IConButton
        iconProps={{ icon: IoChevronBackOutline, size: 24 }}
        iconPosition="left"
        onClick={onBack}
        disabled={isBackDisabled}
      >
        PREVIOUS
      </IConButton>
      <IConButton
        iconProps={{ icon: IoMdSave, size: 24 }}
        iconPosition="left"
        onClick={onSubmit}
        disabled={isNextDisabled}
      >
        SAVE
      </IConButton>
      {!isLastQuestion && (
        <IConButton
          iconProps={{ icon: GrFormNext, size: 24 }}
          iconPosition="right"
          onClick={onNext}
          disabled={isSubmitDisabled}
        >
          {isLastQuestion ? 'FINISH TEST' : 'NEXT'}
        </IConButton>
      )}
    </div>
  );
}

export default NavigationButtons;
