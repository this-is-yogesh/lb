/**
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and using only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [3,3,3,3,3]
Output: 3
 */

var findDuplicate = function (nums) {
  let set = new Set();
  let i = 0;
  while (1) {
    let number = nums[i];
    i = number;
    if (set.has(number)) {
      return number;
    } else {
      set.add(number);
    }
  }
};
