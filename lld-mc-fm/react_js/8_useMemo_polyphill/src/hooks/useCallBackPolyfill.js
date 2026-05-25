import { useRef } from "react";

export default function useCallBackPolyfill(cb, deps) {
  let memoizedReference = useRef();
  let arrayOfDeps = useRef();

  const hasChanged =
    !memoizedReference.current ||
    deps.some((dep, index) => dep !== arrayOfDeps.current[index]);

  if (hasChanged) {
    memoizedReference.current = cb;
    arrayOfDeps.current = deps;
  }

  return memoizedReference.current;
}
