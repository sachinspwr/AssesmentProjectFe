import { Icon } from '@components/atoms';
import { Card, CircleProgressBar } from '@components/molecules/index';
import { TestResultResponseDTO } from '@dto/response';
import { BsCheck } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

interface ResultMarksCardProps {
  testResult: TestResultResponseDTO[];
}

function ResultMarksCard({ testResult }: ResultMarksCardProps) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const scorePercent = calculatePercentage(testResult[0]?.score, testResult[0]?.outOf);
  const strokeDashoffset = circumference * (1 - scorePercent / 100);
  return (
    <Card className="flex-1">
      <div>
        <h3 className="font-bold text-base">RESULT</h3>
        <div className="flex justify-between items-stretch">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className={`${testResult[0]?.isPassed ? 'bg-green-100' : 'bg-red-100'} rounded-full p-1 mr-2`}>
                <Icon
                  icon={testResult[0]?.isPassed ? BsCheck : IoMdClose}
                  className={`w-5 h-5 ${testResult[0]?.isPassed ? 'text-green-500' : 'text-red-500'}`}
                />
              </div>
              <span className={`text-2xl font-bold ${testResult[0]?.isPassed ? 'text-green-500' : 'text-red-500'}`}>
                {testResult[0]?.feedback}
              </span>
            </div>
            <p className="text-black text-lg font-semibold">Your result is available</p>
          </div>
          <CircleProgressBar
            totalQuestions={testResult[0]?.totalQuestions}
            correctAnswersCount={testResult[0]?.correctAnswersCount}
            isPassed={testResult[0]?.isPassed}
            circumference={circumference}
            scorePercent={scorePercent}
            strokeDashoffset={strokeDashoffset}
          />
        </div>
      </div>
    </Card>
  );
}

export { ResultMarksCard };

function calculatePercentage(part: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.floor((part * 100) / total);
}
