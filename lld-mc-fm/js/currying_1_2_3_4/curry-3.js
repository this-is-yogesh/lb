/**
 * 
function sum() {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3, 4));
console.log(curriedSum(1)(2, 3)(4));
console.log(curriedSum(1)(2)(3)(4));

 */


// ans :
function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

function curry(fn) {
  return function curriedSum(...a) {
    if (fn.length === a.length) {
      return fn(...a);
    }
    return function secondFunction(...b) {
      return curriedSum(...a, ...b);
    };
  };
}
let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3, 4)(4), "sum1");
console.log(curriedSum(1)(2, 3)(4)(5), "sum2");
console.log(curriedSum(1)(2)(3)(4)(6), "sum3");

