import React from 'react';

type ProgressBarProps = {
  title: string;
  progress: number;
  completed: number;
  outOf: number;
  color?: string;
  height?: string;
  isShowCompleted?: boolean;
};

function ProgressBar({ title, progress = 0, completed = 0, outOf = 0, isShowCompleted = true }: ProgressBarProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="py-1 text-lg font-medium text-skin-theme-dark dark:text-white">{title}</div>
      <div className="py-1 w-full flex justify-center items-center gap-4">
        {isShowCompleted && (
          <div className="text-skin-theme-dark font-semibold text-lg">
            {completed}/{outOf}
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div style={{ width: `${progress}%` }} className="bg-skin-theme-invert h-2.5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { ProgressBar };
