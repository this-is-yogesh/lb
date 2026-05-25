function mainFunction(len) {
  let sum = null;
  return function curryingSum(...a) {
    console.log(...a, "a-arg");
    //here all the args will be there so we need to check
    // here only
    if (a.length > len) {
      sum = [...a].splice(0, len).reduce((acc, curr) => acc + curr, 0);
    }
    return function secondFunction(...b) {
      console.log(...b, "b-called");
      /** if b is called with() then only we get empty length and then we return sum but if we stop without doing (), b is not called only */
      if (!b.length) {
        return sum;
      } else {
        return curryingSum(...a, ...b);
      }
    };
  };
}
let curryingSum = mainFunction(11);
console.log(curryingSum(1, 1, 1, 1)(1, 1, 1)(1, 1, 1, 1, 1)(1)(1, 1)(), "sum");
