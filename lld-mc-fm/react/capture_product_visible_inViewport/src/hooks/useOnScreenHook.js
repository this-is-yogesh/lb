import { useEffect } from "react";

export default function onScreenHook(elementRef,count) {
  function callBack(entries, observer) {
    if (!entries.length) {
      return;
    }
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("entry-yes", entry.target.innerHTML);
      } 
    });
  }
  const options = {
    threshold: 0.5,
  };
  useEffect(() => {
    let observer = new IntersectionObserver(callBack, options);
    elementRef.current.forEach(elementEntry => observer.observe(elementEntry));
    console.log("observer-useEffect");
    return () => {
      observer.disconnect();
    };
  }, []);
}
