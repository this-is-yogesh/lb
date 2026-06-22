/**
 * In this tutorial, we will see how to create a fetch method with Timeout in JavaScript that will terminate the API call, if it is fulfilled in the given duration.

There are cases in programming where we want to complete the network calls in a certain duration to boost performance.

The original fetch method does not come with an option to abort in X times, thus it is often asked during interviews to create your custom function fetch with a timeout, which will abort the network call if it is not completed in a specified duration.
 */

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 0)
  .then(resp => {
    console.log(resp);
  })
  .catch(error => {
    console.error(error);
  });

function fetchWithTimeout(url, duration) {
  return new Promise((resolve, reject) => {
    let controller = new AbortController();
    let signal = controller.signal;
    let timerId = null;

    fetch(url, { signal })
      .then(res => {
        return res.json();
      })
      .then(res => {
        clearTimeout(timerId);
        resolve(res);
      })
      .catch(e => {
        console.log("Error*", e);
        reject(e);
      });

    timerId = setTimeout(() => {
      controller.abort();
    }, duration);
  });
}
