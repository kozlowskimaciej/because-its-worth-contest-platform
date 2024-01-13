export const getExtension = (filename: string): string => {
  const splitted = filename.split(".");
  return splitted[splitted.length - 1];
};
