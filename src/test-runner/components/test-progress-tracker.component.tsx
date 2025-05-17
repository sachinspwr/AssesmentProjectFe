import React, { useEffect, useMemo, useState } from 'react';
import QuestionStatusItem from './question-status-item.component';
import { IConButton, ProgressBar } from '@components/molecules';
import { Label } from '@components/atoms';
import { Timer } from './timer.component';
import { ImExit } from 'react-icons/im';
import { Modal } from '@components/organisms';
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { PiWarningBold } from 'react-icons/pi';

type TestProgressTrackerProps = {
  questions: string[];
  answered: Set<string>;
  submitted: Set<string>;
  active: string;
  totalTimeInMinutes: number;
  isSubmittingTest?: boolean;
  testId: string;
  onSetActiveQuestionId: (newQuestionId: string) => void;
  onFinish: () => void;
};

function TestProgressTracker({
  questions,
  answered,
  submitted,
  active,
  totalTimeInMinutes,
  isSubmittingTest,
  onSetActiveQuestionId,
  onFinish,
  testId,
}: TestProgressTrackerProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  //It is used to handle the state of the test whether it is autosubmitted or not.
  const [isAutosubmitted, setIsAutosubmitted] = useState(false);

  // For navigating
  const navigate = useNavigate();

  // Add a new state to track the time remaining in minutes
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInMinutes);
  const [showAlert, setShowAlert] = useState(false);

  const answeredArray = useMemo(() => Array.from(answered), [answered]);
  const submittedArray = useMemo(() => Array.from(submitted), [submitted]);
  const classes = 'w-12 h-12 rounded-full flex items-center justify-center';

  const isAnswered = (questionId: string) => {
    return answeredArray.includes(questionId);
  };

  const isSubmitted = (questionId: string) => {
    return submittedArray.includes(questionId);
  };

  const submittedCount = Array.from(submitted)?.length;
  const totalQuestions = questions?.length;
  const allQuestionsAnswered = submittedCount === totalQuestions;

  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    setIsAutosubmitted(false);
    navigate('/test-feedback', {
      state: { answered, submitted, totalTimeInMinutes,testId },
    });
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handleOkClick = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (isAutosubmitted) {
      navigate('/test-runner/sign-off', {
        state: { answered, submitted, totalTimeInMinutes },
      });
    }
  }, [isAutosubmitted, navigate, answered, submitted, totalTimeInMinutes]);

  return (
    <div className="mx-2 w-full px-8 flex flex-col justify-center items-center gap-12">
      <div className="w-full">
        {/* Modifing the Timer component to update the timeRemaining state and trigger an alert when the time remaining reaches 5 minutes */}

        <Timer
          timeValue={totalTimeInMinutes}
          onTimeElapsed={() => {
            setIsAutosubmitted(true);
          }}
          onTick={(remainingTime) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            setTimeRemaining(minutes);
            if (minutes === 5 && seconds === 0 && !showAlert) {
              setShowAlert(true);
            }
          }}
        />
      </div>
      <div className="w-full flex gap-2">
        <ProgressBar
          title="Questions Answered"
          progress={(submittedCount / totalQuestions) * 100}
          completed={Array.from(submitted)?.length}
          outOf={questions?.length}
          color="red"
          height="h-8"
        />
      </div>
      <div
        className="w-full px-2 py-2 flex items-center justify-center gap-4 bg-skin-theme-light
        text-skin-theme border rounded-md"
      >
        <Label className="flex justify-center items-center gap-1">
          <p className={`w-4 h-4 rounded-md flex items-center justify-center !bg-green-500`}></p>
          <p className="text-sm mb-1">Inprogress </p>
        </Label>
        <Label className="flex justify-center items-center gap-1">
          <p className={`w-4 h-4 rounded-md flex items-center justify-center !bg-purple-500`}></p>
          <p className="text-sm mb-1">Answered </p>
        </Label>
        <Label className="flex justify-center items-center gap-1">
          <p className={`w-4 h-4 rounded-md flex items-center justify-center bg-skin-theme-invert`}></p>
          <p className="text-sm mb-1">Pending </p>
        </Label>
      </div>
      <div
        className="w-full p-4 py-8 flex flex-row flex-wrap justify-center items-center gap-6 bg-skin-theme-light
        text-skin-theme rounded-md border"
      >
        {questions.map((question, index) => (
          <QuestionStatusItem
            key={question}
            questionId={question}
            questionIndex={index + 1}
            isAnswered={isAnswered(question)}
            isSubmitted={isSubmitted(question)}
            isCurrent={question === active}
            setActiveQuestionId={onSetActiveQuestionId}
            className={classes}
          />
        ))}
      </div>
      <div className="w-full">
        <IConButton
          iconProps={{ icon: ImExit, size: 24, className: 'animate animate-pulse' }}
          className="w-full flex justify-center items-center gap-1"
          iconPosition="left"
          onClick={handleSubmitClick}
          isLoading={isSubmittingTest}
        >
          SUBMIT TEST
        </IConButton>
      </div>

      <Modal
        isOpen={showConfirmation}
        onClose={handleCancelSubmit}
        onSubmit={handleConfirmSubmit}
        title="Confirm Submission"
        okButtonIcon={FaCheck}
        okButtonLabel="Yes"
        cancelButtonLabel="No"
        width={30}
        height={{
          value: 10,
          unit: 'rem',
        }}
        showFooter={true}
        classes={{
          wrapper: 'bg-opacity-50',
          body: 'flex items-center justify-center',
        }}
      >
        <p className="text-left">
          {allQuestionsAnswered
            ? 'Are you ready to submit your test?'
            : "You haven't answered all the questions yet. Are you sure you want to submit the test?"}
        </p>
      </Modal>

      {/* Another component to display a prompt to the user when there are only 5 minutes remaining in the test.*/}

      <Modal
        isOpen={showAlert}
        onSubmit={handleOkClick}
        title={
          <div className="flex items-center justify-center">
            <PiWarningBold className="mr-2 text-yellow-600" size={24} />
            Time's Running Out
          </div>
        }
        okButtonLabel="OK"
        width={30}
        showFooter={true}
        hideCancelButton={true}
        hideCloseButton={true}
        classes={{
          wrapper: 'bg-opacity-50',
          body: 'flex items-center justify-center',
        }}
      >
        <p className="text-left">
          You have 5 minutes remaining. Be sure to review your answers and submit the test before time expires.
        </p>
      </Modal>
    </div>
  );
}

export { TestProgressTracker };
