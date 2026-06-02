Promises vs setTimeout:


Microtasks - Higher priority.
Examples:
Promise.then
queueMicrotask
MutationObserver


Macrotasks / Callback Queue - Lower priority.
Examples:
setTimeout
setInterval
DOM events

example:
setTimeout(() => console.log("timeout"));

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("sync");
Output:
sync
promise
timeout

Event Loop Working :
JavaScript is single-threaded, so it can execute only one thing at a time on the call stack. When async operations like setTimeout, fetch, or DOM events are encountered, the browser handles them outside the JS engine using Web APIs. Once they complete, their callbacks are placed into queues (microtask queue for promises, callback/macrotask queue for timers/events). The event loop continuously checks whether the call stack is empty, and if it is, it first pushes all microtasks into the stack, then processes macrotasks one-by-one. This mechanism allows JavaScript to perform non-blocking asynchronous operations while keeping the UI responsive.

console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });

}, 0);

Promise.resolve().then(() => {
  console.log("4");

  setTimeout(() => {
    console.log("5");
  }, 0);

});

Promise.resolve().then(() => {
  console.log("6");
});

console.log("7");

Output:
1
7
4
6
2
3
5

rules:
1. Sync code runs first
Always.

2. Promise callbacks are microtasks
Higher priority.

3. setTimeout callbacks are macrotasks
Lower priority.

4. Event loop clears ALL microtasks before macrotasks
VERY important rule.

