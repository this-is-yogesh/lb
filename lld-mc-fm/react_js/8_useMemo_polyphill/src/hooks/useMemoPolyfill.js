import { useRef } from "react";

export default function useMemoPolyfill(cb, deps) {
  const memoizedValue = useRef();
  const prevDeps = useRef();

  const hasChanged =
    !prevDeps.current ||
    deps.some((dep, index) => dep !== prevDeps.current[index]);

  if (hasChanged) {
    memoizedValue.current = cb();
    prevDeps.current = deps;
  }

  return memoizedValue.current;
}
