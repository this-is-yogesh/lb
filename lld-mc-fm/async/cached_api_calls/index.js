/**
 * 
 * Implement a function in JavaScript that caches the API response for the given amount of time. If a new call is made between that time, the response from the cache will be returned, else a fresh API call will be made.
 * 
 * 
 * const call = cachedApiCall(3000);
 * 
 * 
 *
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
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(a =>
    console.log(a, "5000"),
  );
}, 5000);
 */

const call = cachedApiCall(3000);

function cachedApiCall(timer) {
  let cache = {};
  return function (url) {
    return new Promise((resolve, reject) => {
      let cached = cache[url];
      if (cached && Date.now() < cached.expiryTime) {
        console.log("cached");
        resolve(cached.data);
      } else {
        fetch(url)
          .then(res => res.json())
          .then(response => {
            console.log("non-cached");
            cache[url] = {
              data: response,
              expiryTime: Date.now() + timer,
            };
            resolve(response);
          })
          .catch(reject);
      }
    });
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
    console.log(a, "5000"),
  );
}, 5000);

