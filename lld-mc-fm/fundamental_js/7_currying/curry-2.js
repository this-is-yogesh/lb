function mainFunction(len) {
  let sum = null;
  return function curryingSum(...a) {
    if (a.length > len) {
      sum = [...a].splice(0, len).reduce((acc, curr) => acc + curr, 0);
    }
    return function secondFunction(...b) {
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
