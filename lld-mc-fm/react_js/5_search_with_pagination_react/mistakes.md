1. fetch api call in try catch

i was doing 
  function getProducts() {
    setLoading(true);
    try {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setProducts(res?.products);
        })
        .catch((e) => {
          setLoading(false);
          throw new Error("API FAILED Catch");
        });
    } catch (e) {
      setLoading(false);
      throw new Error("API FAILED");
    }
  }

  **note**
  try/catch only catches synchronous errors that occur while the current function is executing. fetch() is asynchronous and immediately returns a Promise, so by the time the network request fails and the .catch() callback runs, the outer try/catch has already finished executing. Therefore, errors thrown inside Promise callbacks are not caught by the surrounding try/catch. To handle asynchronous errors correctly, either use .catch() on the Promise chain or use async/await, where await allows try/catch to catch rejected Promises as if they were synchronous exceptions.

  async function getProducts() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.products);
  } catch (e) {
    setError("API failed");
  } finally {
    setLoading(false);
  }
}

Because await pauses the function, the rejection from fetch() is converted into a thrown exception that the surrounding try/catch can intercept.

2. debounce fn incorrectly implemented

i was doing
  function debounce(fn, timer) {
    let timerId
    return (query) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        console.log(query, "query**");
        fn(query);
      }, timer);
    };
  }
  let debouncedFn = debounce(getProducts, 3000);

**note**

  what was happeing : everytime i was writing query in input box, i could see it in    console.log(query, "query**") which should not happen because my  clearTimeout(timerId) shoudl clear the previous setTimeouts timer which should prevent them from running but as i could see all my query in query** console means it was running irrespective of me doing  clearTimeout(timerId);

  Reason:


My debounce wasn't working because the debounced function was recreated on every render.
    let debouncedFn = debounce(getProducts, 3000);
     Since timerId was stored inside the function's closure (let timerId) each render got its own independent timerId. As a result, clearTimeout(timerId) only had access to the current timer and couldn't cancel timers created by previous renders. Consequently, all scheduled callbacks executed. Moving the timer to a useRef solved the problem because refs persist across renders and provide access to the same timeout ID.


Fix: when we used useRef
  function debounce(fn, timer) {
    return (query) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log(query, "query**");
        fn(query);
      }, timer);
    };
  }
  let debouncedFn = debounce(getProducts, 3000);
Although a new debounced function is still created on every render, the timeout ID is no longer stored inside the function's closure. Instead, it is stored in a useRef, whose value persists across renders. Therefore, every newly created debounced function has access to the same timeout ID and can successfully cancel the previously scheduled timeout.

3. 