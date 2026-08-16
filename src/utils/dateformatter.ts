export const dateformatter = (date: string) => {
  if (!date) return "Not set";
  const newDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return newDate;
};
