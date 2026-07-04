/**
 * 
 * Create a function in JavaScript that memoizes or caches the result
 *  for the given input so that the subsequent calls for the same inputs will be faster.

Example
slowFunc(params) // normal call, slow output

const memoized = memoize(slowFunc);
memoized(params) //first call, extremely slow -> caches the result
memoized(params) //second call, very fast.
//all the subsequents call for the same input will be faster.

memoized(differentParams) //first call, extremely slow -> caches the result
memoized(differentParams) //second call, very fast.
 */

function slowFunction(a = 100000) {
  let count = 0;
  for (let i = 0; i < a; i++) {
    count += i;
  }
  return count;
}

function memoize(cb) {
  let object = {};

  return function (...params) {
    let key = JSON.stringify(params);
    if (!object.hasOwnProperty(key)) {
      {
        object[key] = cb(...params);
      }
    }
    return object[key];
  };
}

const memoized = memoize(slowFunction);

let start1 = performance.now();
memoized(9000000);
let end1 = performance.now();
console.log(end1 - start1, "total-time-1");

let start2 = performance.now();
memoized(9000000);
let end2 = performance.now();
console.log(end2 - start2, "total-time-2");

let start3 = performance.now();
memoized(8000000);
let end3 = performance.now();
console.log(end3 - start3, "total-time-3");

let start4 = performance.now();
memoized(8000000);
let end4 = performance.now();
console.log(end4 - start4, "total-time-4");
