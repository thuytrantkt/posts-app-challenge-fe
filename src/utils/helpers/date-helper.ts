export const dateFormatted = (date: string) => {
  const parsedDate = Date.parse(date);
  if (isNaN(+date) && !isNaN(parsedDate)) {
    return new Date(date).toLocaleDateString("en-US");
  } else {
    return "";
  }
};
