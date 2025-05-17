
type CircleProgressBarprops = {
  circumference: number;
  scorePercent: number;
  strokeDashoffset: number;
  totalQuestions: number;
  correctAnswersCount: number;
  isPassed: boolean;
};

function CircleProgressBar({
  circumference,
  scorePercent,
  strokeDashoffset,
  totalQuestions,
  correctAnswersCount,
  isPassed,
}: CircleProgressBarprops) {
  return (
    <div className="relative size-60">
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={`stroke-current ${isPassed ? 'text-green-200' : 'text-red-200'}`}
          stroke-width="3"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={`stroke-current ${isPassed ? 'text-green-600' : 'text-red-600'}`}
          stroke-width="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col">
          <span className={`text-center text-3xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
            {scorePercent}
          </span>
          <span
            className={`text-center text-sm font-bold ${isPassed ? 'text-green-400' : 'text-red-400'}`}
          >{`${correctAnswersCount}/${totalQuestions}`}</span>
        </div>
      </div>
    </div>
  );
}

export { CircleProgressBar };
