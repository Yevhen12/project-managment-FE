export const formatLoggedTime = (days: number, hours: number, minutes: number): string => {
  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  return result.trim();
};

export const isValidTimeEntry = (days: number, hours: number, minutes: number): boolean => {
  const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
  return totalMinutes > 0;
};

