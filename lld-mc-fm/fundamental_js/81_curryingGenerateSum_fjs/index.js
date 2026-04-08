/**
 * 
 * 

 */

const generateSum = limit => {
  return function helper(...args) {
    return function temp(...args2) {
      console.log(...args, ...args2, "OGargs");
      return helper(...args, ...args2); // this gets called immediately and it will return function temp again 
    };
  };
};
/**1-- this will solve the problem where you have to concat all the different args passed from different functions so for example we are passing 3 diiffernt functions args so ideally i have to return 3 functions from helper in order to counter all three , but i am using recursion and just concating every arg together */

//let sum = generateSum(5);
//console.log(sum(18, 115)(12)(14, 12, 22), "sumresult");

/** */

/***2--
 * okay , so we have deviced a function which will calculate the sum if limit is given, it keeps adding the args to the array until the length of the array is greater than equal to the limit and then we calculate the sum of the digits , but the challenge here is if we have already calculated the sum and if return the sum but we still have functions left to call from our calling function sum then it will throw an error because sum is expecting a fucntion but we are returning a value, this works if we dont have any function to call after calculating sum but breaks if we have functions to call
 *
 *
 * we can fix this by adding  return helper(...args) and putting !argsSum condition and by adding (!args.length) but then for that we will need an empty args call at the end sum2(4)(5, 6)(7, 8, 9)(10)()
 * how to do it without adding this empty call, actually this is fine because in order to do it without empty call, we will need to use helper.toString, helper.valueOf which i dont think should be used
 */

const generateSum2 = limit => {
  let argsSum = 0;

  return function helper(...args) {
      if (args.length >= limit && !argsSum) {
        let allowedArgs = args.slice(0, limit);
        argsSum = allowedArgs.reduce((acc, curr) => acc + curr, 0);
        console.log(args, "argsSum");
        return helper(...args);
      } else {
        return function temp(...args2) {
          if (!args2.length) {
            console.log(args2, "tempArgs");
            return argsSum;
          } else {
            return helper(...args, ...args2);
          }
        };
      }
  };
};

//let sum2 = generateSum2(5);
//console.log(sum2(4)(5, 6)(7, 8, 9)(10)(), "sumresult");

/** */

/***3--
 *
 * here what we have to do is ,we have to call generateSum with function sum(a,b,c,d){ return a+b+c+d}
 */

function sum(a, b, c, d) {
  return a + b + c + d;
}
const generateSum3 = fn => {
  return function helper(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function temp(...args2) {
        return helper(...args, ...args2);
      };
    }
  };
};

let sum3 = generateSum3(sum);
console.log(sum3(4)(5, 6)(7, 8, 9), "sumresult");
/** */
