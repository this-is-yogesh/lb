**Async await behaviour**

What if you have been given bunch of apis and you have to execute them in sequence one after the other ?

Promises and async/await
ans 1. When multiple API calls need to execute sequentially, we can leverage Promises and async/await.
Libraries like fetch and axios return Promises, which represent asynchronous operations that complete in the future.

We can:
wrap API calls inside functions
store function references in an array
iterate through them using for...of
use await before each call

await pauses execution of the async function until the current Promise resolves, ensuring that the next API executes only after the previous one completes.

NOTE : await only pauses the async function NOT the entire JS engine meaning any code in async function will pause but outside async function, all code will continue to run 

example : 
async function apiCall() {
  console.log("API Start");
  await fetch("https://jsonplaceholder.typicode.com/posts/1");
  console.log("API End");
}

apiCall();

setInterval(() => {
  console.log("Timer Running");
}, 1000);

Output :
API Start

Timer Running
Timer Running
Timer Running

API End
Even while await fetch(...) is waiting:

timers continue
browser works
event loop continues

That proves:

await pauses only the async function
NOT the JS engine



**new Promise vs Promise.resovle()**
new Promise(()=>{}) vs Promise.resolve().then(()=>{})

new Promise creates a promise and contructor itself is synchronous but Promise.resolve, promise is already created, now it tells what to do about consumption in .then 

example:
const p = new Promise((
  res,rej
) => {
  console.log("inside");
  res('promise resolved')
});

console.log("outside");
Output :
inside
outside

Promise.resolve().then(() => {
  console.log("then");
});

console.log("sync");
output:
sync
then


**Event Loop Tracing of Promise and setTimeout**

event loop in promises
const asyncTask = function(i) {
  return function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Completing ${i}`);
      }, 100 * i);
    });
  }

}

const promises = [
  asyncTask(3),
  asyncTask(1),
];

async function run(tasks) {
  for (const task of tasks) {
    const result = await task();
    console.log(result);
  }
}

run(promises);

SUPER IMPORTANT Queue Understanding:

When timeout finishes:
Macrotask Queue:
[resolve callback]

After resolve:
Microtask Queue:
[resume async function]

And:

microtasks ALWAYS execute before next macrotask
This is the heart of async JS.

when we enter the new Promise the sync code gets executed and now we see that there is setTimeout, so its timer is registered with WEB api ( web apis run in parallel to the js engine) , promise is in pending state right now 
when timer finishes after 300 ms setTimeout callback is pushed into macrotask queue by browser, queue will look like this 
[
  () => resolve("Completing 3")
]
then event loop picks mactrostask queue tasks since callstack & microtask queue is empty and event loop pushes callback into callstack then it will execute callback which resolves promise  and now promise is in fulfilled statea and after resolve the code waiting on that proimse whether it is .then or the paused async code after await goes into microtask queue to be executed ,like here console.log(result) will be scheduled in microtask queue , so now event loop priotises the code in microqueue and then moves it into callstack and executes it in callstack


**Web APIS**

Web APIs are provided by the browser/runtime and execute outside the JavaScript call stack. While JavaScript continues executing synchronous code, browser-managed async operations like timers, network requests, and DOM events progress independently. Once completed, their callbacks are queued for the event loop to process.


Things like:

fetch
setTimeout
DOM events
localStorage
console
geolocation

Common Web APIs  provided by the browser / run time environment like node.js
Web API	- Purpose
setTimeout - 	timers
fetch	 - network calls
DOM	- manipulate UI
addEventListener	- events
localStorage - 	browser storage
navigator.geolocation	- location
WebSocket	- realtime connection


forever pending state promise = new Promise((res,rej)=>console.log('hi'))


**Promise return Concept**
  return acc
    .then(res => {
      return curr().then(resp => {
        return resp + 12;
      });
    })

means return curr().then(resp => {
        return resp + 12;
      }); 
so it return Promise.resolve(resp+12) 
and acc.then return Promise.resolve(resp+12) 
so final value returned will be Promise.resolve(resp+12) 
