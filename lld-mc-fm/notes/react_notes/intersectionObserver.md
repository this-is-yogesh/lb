3. How IntersectionObserver Is Used
Step 1: Create an observer
const observer = new IntersectionObserver(callback, options);
Step 2: Observe each element
elementsRef.current.forEach((element) => {
  observer.observe(element);
});

Step 3: Browser tracks visibility

Whenever an observed element enters or leaves the viewport, the browser invokes:

callback(entries, observer)

where entries contains information about the affected elements.

Example:

entries.forEach((entry) => {
  if (entry.isIntersecting) {
    console.log(entry.target.innerText, "visible");
  } else {
    console.log(entry.target.innerText, "hidden");
  }
});