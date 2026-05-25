/** question 
 * 
 * 
 * console.log(add(1, 2)(3).value() == 6);
console.log(add(1)(2)(3).value() == 6);
console.log(add(1)(2) + 3 == 6);
 * 
*/


console.log(add(1)(2).value() == 6);
console.log(add(1, 2)(3).value() == 6);
console.log(add(1)(2)(3).value() == 6);
console.log(add(1)(2) + 3 == 6);

function add(...x) {
  let sum = x;
  function resultFun(...y) {
    sum = [...sum, ...y];
    return resultFun;
  }

  resultFun.valueOf = function () {
    return sum.reduce((a, b) => a + b, 0);
  };
  resultFun.value = resultFun.valueOf;
  return resultFun;
}
