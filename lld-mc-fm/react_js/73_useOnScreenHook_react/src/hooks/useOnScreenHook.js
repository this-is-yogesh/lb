import { useState, useEffect } from "react";
export default function useOnScreenHook(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    (entries, observer) => {
      let [entry] = entries;
      console.log("intersecting", entry.isIntersecting, ref.current);
      /**2-- any moment we are scrolling this obsever callback gets triggred and it will determine which elements are in viewport  */
      setIsIntersecting(entry.isIntersecting);
    },
    { threshold: 1 },
  );

  useEffect(() => {
    observer.observe(ref.current);
    console.log("observerEffect");
    /**1-- this will only run once, when the component mounts then we are observing all the elements */
    () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
}
