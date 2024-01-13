export const getFilename = (file: string): string => {
  const splitted = file.split("/");
  return splitted[splitted.length - 1];
};
