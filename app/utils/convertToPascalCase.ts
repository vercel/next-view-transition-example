export const convertToPascalCase = (s: string) => {
  if (!s) return s;
  return s
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};
