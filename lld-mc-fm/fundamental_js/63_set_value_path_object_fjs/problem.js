/**
 * 
Given an object, a path in the string or array of strings format, and a value, update the value at the given path in the object.

This is a polyfill for lodash._set() method and is opposite of lodash._get() method.

Example
const object = { 'a': [{ 'b': { 'c': 3 } }] };

set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// 4

set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// 5
 */