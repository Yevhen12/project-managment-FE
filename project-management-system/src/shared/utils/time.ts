export const convertToMinutes = (days: number = 0, hours: number = 0, minutes: number = 0): number => {
  return (days * 1440) + (hours * 60) + minutes;
};

export const parseMinutes = (totalMinutes: number): {
  days: number;
  hours: number;
  minutes: number;
} => {
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
};

// utils/time.ts
export const formatMinutes = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes || parts.length === 0) parts.push(`${minutes}m`);

  return parts.join(" ");
};
