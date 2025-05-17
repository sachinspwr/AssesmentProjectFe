import React, { useState, useEffect, useRef } from 'react';

type TimerProps = {
  timeValue: number; // Time in minutes
  onTimeElapsed: () => void;
  className?: string;
  mode?: 'default' | 'plain';
  onTick?: (remainingTime: number) => void;
};

function Timer({ timeValue, onTimeElapsed, mode = 'default', className, onTick }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(timeValue * 60); // Convert minutes to seconds initially
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start or restart the timer when timeValue changes
  useEffect(() => {

    setTimeLeft(timeValue * 60); // Convert minutes to seconds
    setIsActive(true);

    // Clean up interval on component unmount or when restarting the timer
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeValue]);

  // Handle countdown logic
  useEffect(() => {

    if (!isActive || timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          onTimeElapsed();
          return 0;
        }
        return prevTime - 1;
      });
      if (onTick) {
        onTick(timeLeft); // Called the onTick function here
      }
    }, 1000);



    // Clean up interval on component unmount or when stopping the timer
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, onTimeElapsed, onTick]);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Format numbers to be double digits
  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    (mode === 'default' && (
      <div
        className={`w-full items-center justify-center bg-skin-theme-light
        text-skin-theme px-6 py-2 rounded-xl ${className} ${timeLeft < 10 ? '!text-red-500' : ''}`}
      >
        <div className="flex items-center justify-center w-full gap-6 count-down-main">
          <div className="timer">
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
              <h3 className="countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                {formatTime(hours)}
              </h3>
            </div>
            <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">hours</p>
          </div>
          <div className="timer">
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
              <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                {formatTime(minutes)}
              </h3>
            </div>
            <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">minutes</p>
          </div>
          <div className="timer">
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
              <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                {formatTime(seconds)}
              </h3>
            </div>
            <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">seconds</p>
          </div>
        </div>
      </div>
    )) ||
    (mode === 'plain' && (
      <div className="flex gap-1">
        <div className="timer">
          <div className="pr-1.5  relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className="pl-2 countdown-element minutes font-manrope font-semibold text-base text-theme-default tracking-[15.36px] max-w-[44px] text-center relative z-20">
              {formatTime(minutes)}
            </h3>
          </div>
        </div>
        <div className="timer">
          <div className="pr-1.5  relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className="pl-2 countdown-element minutes font-manrope font-semibold text- text-theme-default tracking-[15.36px] max-w-[44px] text-center relative z-20">
              {formatTime(seconds)}
            </h3>
          </div>
        </div>
      </div>
    ))
  );
}

export { Timer };
