var isValid = function (s) {
  let map = new Map();
  let stack = new Array();
  map.set("}", "{");
  map.set("]", "[");
  map.set(")", "(");
  for (let char of s) {
    if (map.has(char)) {
      if (map.get(char) === stack[stack.length - 1]) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack?.length ? false : true;
};

/**
 * 
 * TC : O(n) where n is the length of the string s
 * SC:Map  -> O(1) +  O(n) so total O(n)
 * 
 */
