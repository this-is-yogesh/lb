/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  let stack = new Array();
  for (let i = 0; i < num.length; i++) {
    while (stack.length && num[i] < num[stack[stack.length - 1]] && k) {
      stack.pop();
      k--;
    }

    stack.push(i);
  }
  while (k) {
    stack.pop();
    k--;
  }
  let zeroEncountered = false;
  let finalStr = "";

  for (let i = 0; i < stack.length; i++) {
    while (!zeroEncountered && num[stack[i]] === "0" && i < stack.length) {
      i++;
    }
    zeroEncountered = true;
    if (num[stack[i]] >= 0) {
      finalStr += num[stack[i]];
    }
  }
  return !finalStr ? "0" : finalStr;
};
