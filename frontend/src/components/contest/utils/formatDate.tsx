export const formatDate = (inputDate: Date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(inputDate);

  return date.toLocaleDateString("pl-PL", options as any);
};
