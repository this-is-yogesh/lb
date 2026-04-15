/**
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.


Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 */

//brute force solution
var subarraySum = function (nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum === k) {
      count++;
    }
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }
  return count;
};
let nums = [1, -1, 0],
  k = 0;
//console.log(subarraySum(nums, k));

/***
 *
 * “How many previous sums can combine with current sum to make k?”
 * Current sum - previous sum = k → previous sum = current sum - k
 */
var subarraySumOptimal = function (nums, k) {
  let count = 0;
  let sum = 0;
  let map = { 0: 1 };

  for (let num of nums) {
    sum += num;

    if (map[sum - k]) {
      count += map[sum - k];
    }
    map[sum] = (map[sum] || 0) + 1;
  }
  console.log(map)
  return count;
};
let nums_aray = [1, -1, 0];
let target = 0;
console.log(subarraySumOptimal(nums_aray, target));

/**
 * “Can we do better than O(n) space?”
👉 Answer:
❌ No, because we need to remember previous prefix sums
 */