var nextGreaterElements = function (nums) {
  let n = nums.length;
  let ans = new Array(n).fill(-1);
  let stack = [];

  for (let i = 0; i < 2 * n; i++) {
    let index = i % n;

    while (stack.length && nums[index] > nums[stack[stack.length - 1]]) {
      let topIndex = stack.pop();
      ans[topIndex] = nums[index];
    }

    // only push during first pass
    if (i < n) {
      stack.push(index);
    }
  }

  return ans;
};
