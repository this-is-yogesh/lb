/**
 * 
 * Create an iterator method that accepts an array and returns a new method, that will return the next array value on each invocation.

Example
let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
 */

function helper(array) {
  let index = -1;
  return {
    next: function () {
      if (index < array.length - 1) {
        index++;
        return array[index];
      } else {
        return null;
      }
    },
    done: function () {
      return index >= array.length - 1;
    },
  };
}
let iterator = helper([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
