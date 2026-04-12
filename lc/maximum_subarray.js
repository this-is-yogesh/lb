

/**
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

//edge cases : [-2,-1] , ans is -1

Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 */


var maxSubArray = function (nums) {
  let maximumSum = nums[0];
  let sum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    sum += nums[i];
    sum = Math.max(sum, nums[i]);
    maximumSum = Math.max(sum, maximumSum);
  }
  return maximumSum;
};



/**
 * 
 * 
 * we will first take sum = 0 and start by adding the second element to sum and then check if that sum is greater or the current element, if our current element is greater then that becomes our sum from there but we will also keep track of maximumsum so that we dont loose track of the greatest sum we got so far 
 */