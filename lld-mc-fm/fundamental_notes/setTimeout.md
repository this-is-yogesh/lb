1. can we await a funciton which has only setTimeout and not promise, like this 
function A() 
{ setTimeout(() => 
{ return 2 }, 5000)
}


await only waits for Promises. setTimeout itself is callback-based and returns a timer ID, not a Promise. Therefore, to use await with setTimeout, we must wrap the callback in a Promise and call resolve() when the timer completes. Also, return inside the setTimeout callback returns from the callback function, not from the outer function.



setTimeout itself doesn't return the callback's result. The callback executes asynchronously in the future, after the outer function has already completed. Therefore, to get a value out of a setTimeout, we either pass it to a callback function or wrap the timer inside a Promise and resolve that Promise with the desired value.

approach 1 : 
use a callback
function A(cb) {
  setTimeout(() => {
    cb(2);
  }, 5000);
}

A((value) => {
  console.log(value);
});

approach 2 :
return a promise

function A() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 5000);
  });
}
async function main() {
  const value = await A();

  console.log(value);
}

main();