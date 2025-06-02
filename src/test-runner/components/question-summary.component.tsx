import { Icon, Label } from '@components/atoms';
import { IConWithLabel } from '@components/molecules/index';
import { QuestionResponseDTO } from '@dto/response';
import { MdLockClock } from 'react-icons/md';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { MdOutlineTopic } from 'react-icons/md';
import { Timer } from './timer.component';

type QuestionSummary = DefaultProps & {
  question: QuestionResponseDTO;
};

function QuestionSummary({ question, className }: QuestionSummary) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { questionText, questionExplanation, subject,  timeLimit, marks} = question;
  return (
    <div className={`w-full p-4 flex flex-col gap-2 ${className}`}>
      <Label className="text-xl text-skin-theme-dark">{questionText}</Label>
      {questionExplanation && (
        <p
          title={questionExplanation}
          className="relative text-md text-skin-theme mx-2 mr-5 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {questionExplanation}
        </p>
      )}
      <div className="px-2 flex justify-start items-start gap-10">
        <Label className="flex justify-center items-center gap-1 min-w-[120px]">
          <Icon icon={MdLockClock} />
          <div className="flex items-center mt-1">
            <Timer mode="default" duration={timeLimit}  />
          </div>
          <span className="mt-1 font-semibold">Min</span>
        </Label>
        <IConWithLabel icon={MdOutlineAccountBalanceWallet} label={`${marks} Marks.`} />
        <IConWithLabel icon={MdOutlineTopic} label={subject} />
      </div>
    </div>
  );
}

export { QuestionSummary };
