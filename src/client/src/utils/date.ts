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
