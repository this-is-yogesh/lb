/**1.  */
function curryingSum(...a) {
  console.log(a);
  return function secondFunction(...b) {
    console.log(a, b);
  };
}
curryingSum(1, 2)(3, 4);
/**1.  */

/**2 */
function curryingSum(...a) {
  console.log(...a, "a-arg");
  return function secondFunction(...b) {
    console.log(...b, "b-called");
    curryingSum(...a, ...b);
  };
}
let secondFunction = curryingSum(1, 2);
let func2 = secondFunction(3, 4, 5);
/**second function didnt return anything hence func2 is not
 there and calling it will error **/
func2(6);

function curryingSum(...a) {
  console.log(...a, "a-arg");
  return function secondFunction(...b) {
    console.log(...b, "b-called");
    /**but now if we do return curryingSum(...a, ...b);
     *  in second function then it will return the returned
     * function from curryingSum and hence func2 will be there */
    return curryingSum(...a, ...b);
  };
}
let secondFunction2 = curryingSum(1, 2);
let func22 = secondFunction(3, 4, 5);
func22(6)
/**2 */

/**3 */
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
/** main function was needed so that we could store sum inside it and not pollute global scope and also pass length as dynamic */
/**3 */