/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  let stack = new Array();
  let n = asteroids.length;
  for (let i = 0; i < n; i++) {
    if (!stack.length) {
      stack.push(asteroids[i]);
      continue;
    }
    let currentElement = asteroids[i];
    if (currentElement > 0) {
      stack.push(currentElement);
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] > 0 &&
        Math.abs(currentElement) > stack[stack.length - 1]
      ) {
        stack.pop();
      }
      // if top and current are opposite but equal
      if (Math.abs(currentElement) === stack[stack.length - 1]) {
        stack.pop();
        continue;
      }
      if (!stack.length || stack[stack.length - 1] < 0)
        stack.push(currentElement);
    }
  }
  console.log(stack);
  return stack;
};

/**
 * Even though there is a while loop, each asteroid is:

pushed at most once
popped at most once

So the total number of stack operations across the entire algorithm is at most 2n.
 */
// Time: O(n);
// Space: O(n);