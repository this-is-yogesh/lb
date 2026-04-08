/**Extend the arrays in javascript such that an event gets dispatched whenever an item is added or removed.

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

5 " was removed" */