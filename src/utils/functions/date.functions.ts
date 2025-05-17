import { format, intervalToDuration, isValid, parseISO } from 'date-fns';

function formatTime(minutes: number): string {
  // Convert minutes to seconds
  const totalSeconds = minutes * 60;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutesPart = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;

  // Format each part to ensure two digits
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutesPart).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function formatReadableTime(minutes: number): string {
  // Convert minutes to seconds
  const totalSeconds = minutes * 60;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutesPart = Math.floor(remainingSecondsAfterHours / 60);

  // Build the time string
  let timeString = '';

  if (hours > 0) {
    timeString += `${hours}h `;
  }
  if (minutesPart > 0 || hours > 0) {
    // Include minutes if there's any hour or if minutes are non-zero
    timeString += `${minutesPart}m `;
  }

  return timeString.trim();
}

function formatDuration(minutes: number): string {
  const duration = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000, // convert minutes to milliseconds
  });

  const parts = [];
  if (duration.hours) parts.push(`${duration.hours}h`);
  if (duration.minutes || parts.length === 0) parts.push(`${duration.minutes ?? 0}m`);

  return parts.join(' ');
}

function parseDuration(durationStr?: string | null): number {
  if (!durationStr || typeof durationStr !== 'string') {
    return 0;
  }

  const hourMatch = durationStr.match(/(\d+)\s*h/i);
  const minuteMatch = durationStr.match(/(\d+)\s*m/i);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  return hours * 60 + minutes;
}


function defaultFormatDtTm(date: Date | string | null | undefined, showTime: boolean = true): string | null {
  if (!date) return null;

  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(parsedDate)) return null;

  const dateFormat = showTime ? 'MMM dd, yyyy hh:mm a' : 'MMM dd, yyyy';
  return format(parsedDate, dateFormat);
}

export { formatDuration, parseDuration, defaultFormatDtTm, formatTime, formatReadableTime };
