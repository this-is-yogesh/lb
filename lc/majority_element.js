
/**
 * 
 * 
 * Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.


Example 1:
Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
 */


var majorityElement = function (nums) {
  let count = 0;
  let currentValue = null;

  for (let i = 0; i < nums.length; i++) {
    if (!count) {
      currentValue = nums[i];
      count++;
    } else if (currentValue === nums[i]) {
      count++;
    } else {
      count--;
    }
  }
  return currentValue;
};


/**
 * 
 * 1. explain the approach 
 * 2. give two solutions, one with hashing and other with optimal approach 
 */