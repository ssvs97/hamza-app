export const getDate = (date?: string) => {
  let start = new Date();
  if (date) start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  end.setHours(0, 0, 0, 0);

  return [start, end];
};

export const getNow = () => {
  return new Date().toISOString();
};

export const formatAMPM = (date: string) => {
  const time = new Date(date);
  const dateOnly = time.toISOString().split("T")[0];
  const timeOnly = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return [dateOnly, timeOnly];
};
