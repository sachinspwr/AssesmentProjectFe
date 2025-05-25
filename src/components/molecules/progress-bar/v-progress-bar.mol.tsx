import React from 'react';
import { VTypography } from '../typography/v-typography.mol';

type ProgressBarProps = {
    label: string;
  completed: number;
  outOf: number;
};

function VProgressBar({ label, completed, outOf }: ProgressBarProps) {
    const percentage = (completed / outOf) * 100;
    let progressColor = "bg-theme-negative"; // Default: Fail (Red)

    if (percentage >= 40 && percentage < 70) {
      progressColor = "bg-theme-warning"; // Warning (Yellow)
    } else if (percentage >= 70) {
      progressColor = "bg-theme-positive"; // Pass (Green)
    }

    return (
      <div>
        <div className="flex justify-between mb-1">
          <VTypography className="!text-xs font-semibold">{label}</VTypography>
          <VTypography color='muted' className="!text-xs text-theme-secondary">{percentage.toFixed(0)}% ({completed}/{outOf})</VTypography>
        </div>
        <div className="h-2 bg-theme-muted rounded">
          <div className={`h-full ${progressColor} rounded`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
}

export { VProgressBar };