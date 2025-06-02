import React, { useState, useEffect, useRef, useCallback } from 'react';

type TimerMode = 'default' | 'compact' | 'minimal';
type TimerVariant = 'neutral' |'system' | 'warning' | 'critical';

interface TimerProps {
  duration: number; // Time in minutes
  onComplete?: () => void;
  onTick?: (remainingTime: number) => void;
  mode?: TimerMode;
  variant?: TimerVariant;
  className?: string;
  autoStart?: boolean;
  showLabels?: boolean;
  warningThreshold?: number; // in minutes
  criticalThreshold?: number; // in minutes
}

// eslint-disable-next-line react/function-component-definition
const Timer: React.FC<TimerProps> = ({
  duration,
  onComplete,
  onTick,
  mode = 'default',
  variant: initialVariant = 'neutral',
  className = '',
  autoStart = true,
  showLabels = true,
  warningThreshold = 10, // default 10 minutes
  criticalThreshold = 5, // default 5 minutes
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(autoStart);
  const [currentVariant, setCurrentVariant] = useState<TimerVariant>(initialVariant);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate time units
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  // Format time values to two digits
  const formatTime = useCallback((time: number): string => {
    return time.toString().padStart(2, '0');
  }, []);

  // Handle timer completion
  const handleComplete = useCallback(() => {
    setIsActive(false);
    onComplete?.();
  }, [onComplete]);

  // Update variant based on remaining time
  const updateVariant = useCallback(
    (time: number) => {
      const remainingMinutes = time / 60;

      if (remainingMinutes <= criticalThreshold) {
        setCurrentVariant('critical');
      } else if (remainingMinutes <= warningThreshold) {
        setCurrentVariant('warning');
      } else {
        setCurrentVariant(initialVariant);
      }
    },
    [warningThreshold, criticalThreshold, initialVariant]
  );

  // Reset timer when duration changes
  useEffect(() => {
    setRemainingTime(duration * 60);
    setIsActive(autoStart);
    updateVariant(duration * 60);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, autoStart, updateVariant]);

  // Main timer logic
  useEffect(() => {
    if (!isActive || remainingTime <= 0) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(intervalRef.current!);
          handleComplete();
          return 0;
        }

        updateVariant(newTime);
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, remainingTime, onTick, handleComplete, updateVariant]);

  // Determine visual style based on current variant
  const getVariantStyle = (): string => {
    switch (currentVariant) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-amber-600 bg-amber-50';
      case 'system':
        return '!text-theme-brand !bg-theme-highlight';
      default:
        return 'text-theme-brand bg-indigo-50';
    }
  };

  // Timer controls
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setRemainingTime(duration * 60);
    setIsActive(autoStart);
    updateVariant(duration * 60);
  };

  // Render time segment
  const renderTimeSegment = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className={`relative px-3 py-1 rounded-lg ${getVariantStyle()}`}>
        <span className="font-mono font-bold text-2xl tracking-wider">{formatTime(value)}</span>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 transform -translate-x-1/2" />
      </div>
      {showLabels && <span className="text-xs text-gray-500 mt-1">{label}</span>}
    </div>
  );

  // Render based on mode
  switch (mode) {
    case 'compact':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          {hours > 0 && renderTimeSegment(hours, 'h')}
          {renderTimeSegment(minutes, 'm')}
          {renderTimeSegment(seconds, 's')}
        </div>
      );

    case 'minimal':
      return (
        <div className={`font-mono font-medium ${getVariantStyle()} px-2 py-1 rounded ${className}`}>
          {hours > 0 && `${formatTime(hours)}:`}
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
      );

    default:
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <div className="flex gap-4">
            {hours > 0 && renderTimeSegment(hours, 'hours')}
            {renderTimeSegment(minutes, 'minutes')}
            {renderTimeSegment(seconds, 'seconds')}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={toggleTimer}
              className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button onClick={resetTimer} className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100">
              Reset
            </button>
          </div>
        </div>
      );
  }
};

export { Timer };
