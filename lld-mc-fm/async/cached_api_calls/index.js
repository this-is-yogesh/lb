/**
 * 
 * Implement a function in JavaScript that caches the API response for the given amount of time. If a new call is made between that time, the response from the cache will be returned, else a fresh API call will be made.
 * 
 * 
 * const call = cachedApiCall(3000);
 *
 * call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
  console.log(a, "first call"),
);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "1000"),
  );
}, 1000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "2000"),
  );
}, 2000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "3000"),
  );
}, 3000);
 */

const call = cachedApiCall(3000);
function cachedApiCall(timer) {
  let cache = {};
  let totalTime = null;
  return url => {
    if (cache[url] && Date.now() < totalTime) {
      console.log("cached");
      return Promise.resolve(cache[url]);
    } else {
      console.log("non-cached");
      return fetch(url)
        .then(res => {
          return res.json();
        })
        .then(res => {
          cache[url] = res;
          totalTime = Date.now() + timer;
          return cache[url];
        });
    }
  };
}

call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
  console.log(a, "first call"),
);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "1000"),
  );
}, 1000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "2000"),
  );
}, 2000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "3000"),
  );
}, 3000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "3500"),
  );
}, 3500);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "4000"),
  );
}, 4000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "5000"),
  );
}, 5000);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "7000"),
  );
}, 7000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "9000"),
  );
}, 9000);
