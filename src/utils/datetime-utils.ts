import dayjs from 'dayjs';

/**
 * Format the date time
 * @param date date
 * @returns formatted string to represent the date time
 */
export function formatDateTime(date: Date | string | number) {
  const m = dayjs(date);
  return m.format('MMM D, YYYY hh:mm:ss a');
}

/**
 * Format the datetime into a relative format
 * @param date datetime
 * @returns formatted string to repesent relative date time
 */
export function formatTimeAgo(date: Date | string | number) {
  const target = dayjs(date);
  const now = dayjs();
  if (now.diff(target, 'day') >= 1) {
    if (now.diff(target, 'day') < 2) {
      return 'Yesterday';
    } else {
      return formatDateTime(date);
    }
  } else if (now.diff(target, 'hour') >= 1) {
    return `${now.diff(target, 'hour')}h ago`;
  } else if (now.diff(target, 'minute') < 1) {
    return 'Just now';
  } else {
    return `${now.diff(target, 'minute')}m ago`;
  }
}
