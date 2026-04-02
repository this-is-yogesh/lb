/**
 * 
 * 
 * Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Example 1:

Input: n = 19
Output: true
Explanation:
1 sqr2 + 9 sqr2 = 82
8 sqr2 + 2 srq2 = 68
6 sqr2 + 8sqr2 = 100
1 sqr2 + 0 sqr2 + 0 sqr2 = 1
Example 2:

Input: n = 2
Output: false


 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const seen = new Set();

  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      let digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
    console.log(seen,'->',n);
  }

  return n === 1;
};

console.log(isHappy(2));
