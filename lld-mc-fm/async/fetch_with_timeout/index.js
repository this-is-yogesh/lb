/**
 * In this tutorial, we will see how to create a fetch method with Timeout in JavaScript that will terminate the API call, if it is fulfilled in the given duration.

There are cases in programming where we want to complete the network calls in a certain duration to boost performance.

The original fetch method does not come with an option to abort in X times, thus it is often asked during interviews to create your custom function fetch with a timeout, which will abort the network call if it is not completed in a specified duration.
 */

fetchWithTimeOut("https://jsonplaceholder.typicode.com/todos/1", 50)
  .then(res => console.log(res, "response"))
  .catch(err => {
    console.log(err, "Error");
  });

function fetchWithTimeOut(url, duration) {
  let timerId;
  return new Promise((resolve, reject) => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    fetch(url, { signal })
      .then(res => res.json())
      .then(response => {
        clearTimeout(timerId);
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
    timerId = setTimeout(() => {
      abortController.abort();
      console.log("Aborted Error");
    }, duration);
  });
}
