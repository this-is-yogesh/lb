/**
 * 
 * Implement a function composeAsync that takes any number of promise-returning functions and returns a new function that executes them from right to left, passing the result of each function to the previous one.
 */

function a(x, y) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x * y);
    }, 100);
  });
}

function b(z) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(z + 5);
    }, 100);
  });
}

function c(r) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(r / 10);
    }, 100);
  });
}

composeAsync(
  c,
  b,
  a,
)(5, 3)
  .then(result => {
    console.log("finalResult", result);
  })
  .catch(err => {
    console.error("finalError", err);
  });

function composeAsync(...args) {
  return async function (...arr) {
    let result = arr;
    for (let i = args.length - 1; i >= 0; i--) {
      if (Array.isArray(result)) {
        result = await args[i](...result);
      } else {
        result = await args[i](result);
      }
    }
    return result;
  };
}
