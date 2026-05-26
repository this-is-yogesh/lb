var dailyTemperatures = function (nums) {
  let ansArray = new Array(nums.length).fill(0);
  let stack = new Array();
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      let topIndex = stack.pop();
      ansArray[topIndex] = i - topIndex;
    }
    stack.push(i);
  }

  return ansArray;
};
