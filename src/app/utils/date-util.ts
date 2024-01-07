export const splitDate = (date: string): { day: string; time: string } => {
  const [day, time] = date.split(' ');
  return { day, time };
};

export const mapDate = (date: string): string => {
  const [, month, day] = date.split('-');
  return `${day}.${month}`;
};

export const formatISODate = (date: string | undefined): string | null => {
  return date ? date.replaceAll('-', '.') : null;
};
