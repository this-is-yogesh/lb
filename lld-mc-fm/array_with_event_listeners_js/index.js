Array.prototype.eventNames = {};
Array.prototype.addListener = function (eventName, callback) {
  if (!this.eventNames[eventName]) {
    this.eventNames[eventName] = [];
  }
  this.eventNames[eventName].push(callback);
};
Array.prototype.pushWithEvent = function (eventName, values) {
  this.push(...values);
  this.triggerEvent(eventName, values);
};
Array.prototype.popWithEvent = function (eventName) {
  let value = this.pop();
  this.triggerEvent(eventName, value);
};
Array.prototype.triggerEvent = function (eventName, values) {
  if (this.eventNames[eventName]) {
    this.eventNames[eventName].forEach(callback => {
      callback(eventName, values, this);
    });
  }
};

const arr = [];
arr.addListener("add", (eventName, items, array) => {
  console.log("items were added", items, array);
});

arr.addListener("remove", (eventName, item, array) => {
  console.log(item, " was removed", array);
});

arr.pushWithEvent("add", [4, 5]);
arr.pushWithEvent("add", [7, 8]);
arr.popWithEvent("remove");
arr.popWithEvent("remove");

console.log(arr.eventNames, "eventNames**");
