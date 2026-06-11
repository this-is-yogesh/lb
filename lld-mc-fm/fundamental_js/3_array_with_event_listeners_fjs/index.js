/**
 * 
 * Extend the arrays in javascript such that an 
 * event gets dispatched whenever an item is 
 * added or removed.

Example
Input:
const arr = [];
arr.addListener('add', (eventName, items, array) => {
  console.log('items were added', items);
});

arr.addListener('remove', (eventName, item, array) => {
  console.log(item, ' was removed');
});

arr.pushWithEvent('add', [4, 5]);
arr.popWithEvent('remove');


Output:
"items were added" // [object Array] (2)
[4,5]

5 " was removed"
 */

Array.prototype.eventCollections = {};
Array.prototype.addListener = function (eventName, cb) {
  if (!this.eventCollections[eventName]) {
    this.eventCollections[eventName] = new Array();
  }
  this.eventCollections[eventName].push(cb);
};

Array.prototype.pushWithEvent = function (eventName, arr) {
  this.push(...arr);
  this.eventCollections[eventName].forEach(cb => {
    cb(eventName, arr, this);
  });
};

Array.prototype.popWithEvent = function (eventName) {
  let item = this.pop();
  this.eventCollections[eventName].forEach(cb => {
    cb(eventName, item, this);
  });
};
const arr = [];
arr.addListener("add", (eventName, items, array) => {
  console.log("items were added", eventName, items, array);
});

arr.addListener("remove", (eventName, item, array) => {
  console.log(item, " was removed");
});

arr.pushWithEvent("add", [1, 2, 3, 6, 7]);
arr.popWithEvent("remove");
arr.popWithEvent("remove");
arr.pushWithEvent("add", [4, 5]);
console.log(arr, "arr*");
