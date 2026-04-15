import { useEffect, useState } from "react";

function useOnScreenHook2(elementRef, number) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  let observer = function () {
    let offset = 50;
    let top = elementRef.current.getBoundingClientRect().top;
    setIsIntersecting(
      top + offset >= 0 &&
        top - offset <=
          (window.innerHeight || document.documentElement.clientHeight),
    );
  };
  useEffect(() => {
    observer();

    window.addEventListener("scroll", observer);
    return () => {
      window.removeEventListener("scroll", observer);
    };
  });
  return isIntersecting;
}

export default useOnScreenHook2;
