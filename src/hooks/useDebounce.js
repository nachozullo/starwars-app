import { useCallback, useRef } from "react";

const useDebounce = (func, waitFor) => {
  const timeout = useRef(0);

  return useCallback(
    (...args) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => func(...args), waitFor);
    },
    [func, waitFor]
  );
};

export default useDebounce;
