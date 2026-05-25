1. how do you make sure you make the receving arguments in the function as the array;
2. explain and write the logic of currying
3. why was a mainFunction needed
4. question:

function sum(){
  return a+b+c+d;
}

let curriedSum = curry(sum);


console.log(curriedSum(1,2,3,4));
console.log(curriedSum(1)(2,3)(4));
console.log(curriedSum(1)(2)(3)(4))