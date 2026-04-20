/**
 * Implement a method in Javascript that will take an object and a string or array of strings as a path and return the value at that path. If nothing is found return undefined. Polyfill for lodash._get().

Example
Input:
const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
};

console.log(get(obj, 'a.b.c')); 
console.log(get(obj, 'a.b.c.0')); 
console.log(get(obj, 'a.b.c[1]')); 
console.log(get(obj, 'a.b.c[3]')); 


Output:
// [1,2,3]
// 1
// 2
// undefined
 */