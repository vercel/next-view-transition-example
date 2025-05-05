import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContrastColor(backgroundColor: string): string {
  // // Convert hex to RGB
  // const hex = backgroundColor.replace("#", "");
  // const r = parseInt(hex.slice(0, 2), 16);
  // const g = parseInt(hex.slice(2, 4), 16);
  // const b = parseInt(hex.slice(4, 6), 16);

  // // Calculate relative luminance using the sRGB color space
  // // See: https://www.w3.org/TR/WCAG20/#relativeluminancedef
  // const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // // Return black for light backgrounds, white for dark backgrounds
  // return luminance > 0.5 ? "#4A2B1D" : "#ffffff";

  var color = parseInt(backgroundColor.replace("#", ""), 16);
  var complement = 0xffffff ^ color;
  return "#" + complement.toString(16).padStart(6, "0");
}
