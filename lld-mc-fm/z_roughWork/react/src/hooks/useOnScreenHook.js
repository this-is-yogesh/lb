import { useEffect, useState } from "react";

function useOnScreenHook(elementRef, number) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  let observer = new IntersectionObserver(
    obs => {
      let [entryObserver] = obs;
      setIsIntersecting(entryObserver.isIntersecting);
    },
    { threshold: 1.0 },
  );
  useEffect(() => {
    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  });
  return isIntersecting;
}

export default useOnScreenHook;
