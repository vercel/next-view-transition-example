export type STORAGE_TYPES = "localStorage" | "sessionStorage";

export const getInitialValue = <T>(
  key: string,
  storageType: STORAGE_TYPES,
): T | undefined => {
  if (typeof window === "undefined") return undefined;
  const value = window[storageType].getItem(key);
  return parse(value);
};

export const parse = (value: string | null) => {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const getLocalStorageValue = (key: string) => {
  if (typeof window === "undefined") return undefined;

  return localStorage.getItem(key);
};

export const getAssignmentMuteSessionStorageKey = (assignmentId: string) =>
  `assignmentMute-${assignmentId}`;
