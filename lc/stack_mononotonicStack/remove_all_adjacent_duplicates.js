var removeDuplicates = function (s) {
  let stack = new Array();
  for (let char of s) {
    if (stack.length && char === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack?.length ? stack.join("") : "";
};
