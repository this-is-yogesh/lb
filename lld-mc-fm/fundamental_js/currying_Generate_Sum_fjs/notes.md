1. my solution

function generateSum(limit) {
  let li = limit;
  let totalValue = 0;
  return function helper(...args) {
    return function (...args2) {
      if (!args2.length && totalValue) {
        console.log(totalValue, "returned-val");
        return totalValue;
      }
      if (args.length >= li && !totalValue) {
        let allowedValues = args.splice(0, li);
        totalValue = allowedValues.reduce((acc, curr) => acc + curr);
        console.log(totalValue, "total-1", args2);
        if (!args2.length) {
          return totalValue;
        } else {
          return helper(...args, ...args2);
        }
      } else {
        console.log(totalValue, "total-2", args2);
        return helper(...args, ...args2);
      }
    };
  };
}

let sum = generateSum(4);
console.log(sum(1)(2, 3, 4)(5, 6)(7, 8, 9, 10)(), "returned");