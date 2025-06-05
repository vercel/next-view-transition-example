import { useCallback, useEffect, useState } from "react";
import { getInitialValue, parse } from "../utils/storageUtils";

export const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S),
): [S | undefined, (value: S | undefined) => void] => {
  const [state, setState] = useState<S | undefined>(
    initialState ?? getInitialValue<S>(key, "localStorage"),
  );

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse(item));
  }, [key]);

  const setValue = useCallback(
    (value: S | undefined) => {
      setState(value);
      if (value !== undefined)
        localStorage.setItem(
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        );
      else localStorage.removeItem(key);
    },
    [key, setState],
  );

  return [state, setValue];
};
