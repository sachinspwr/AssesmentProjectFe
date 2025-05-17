import { Label } from '@components/atoms';
import { TestQuestionAnswerResponseDTO } from '@dto/response';
import { QuestionType } from '@utils/enums';

function QuestionWrapper({
  type,
  answerOptions,
  testQuestionAnswerObject,
}: {
  type: string;
  answerOptions: string[];
  testQuestionAnswerObject: TestQuestionAnswerResponseDTO | undefined;
}) {
  const renderQuestionComponent = () => {
    console.log(answerOptions);
    switch (type) {
      case QuestionType.SingleChoice:
        return (
          <div className={`flex flex-col my-5 gap-5`}>
            {answerOptions?.map((option: any) => (
              <div
                key={option}
                className={`flex items-center space-x-2 shadow-sm p-4 rounded-md border ${
                  answerOptions.includes(option)
                    ? 'border-green-500'
                    : testQuestionAnswerObject?.answerText.includes(option)
                      ? 'border-red-500'
                      : ''
                }`}
              >
                <Label htmlFor={option.name} className={`ml-2 font-normal`}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case QuestionType.MultipleChoice:
        return (
          <div className={`flex flex-col my-5 gap-5`}>
            {answerOptions?.map((option: any) => (
              <div
                key={option}
                className={`flex items-center space-x-2 shadow-sm p-4 rounded-md border ${
                  answerOptions.includes(option)
                    ? 'border-green-500'
                    : testQuestionAnswerObject?.answerText.includes(option)
                      ? 'border-red-500'
                      : ''
                }`}
              >
                <Label className={`ml-2 font-normal text-md tracking-wide`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <>
      <div className="w-full">{renderQuestionComponent()}</div>
    </>
  );
}

export { QuestionWrapper };
