/**
 * 
 * 
 * will use sliding window, will keep adding the sum and if sum is greater than equal to target, keep removing element[i] from total sum and i++
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.


Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1


Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
 */

/** approach : cant do sorting else the original array will get mixed and we will loose original sub array
 *
 * will start from i=0;j=1;will get the sum ,if sum is greater than or equal to target number, will increment the i
 *
 */
var minSubArrayLen = function (nums, target) {
  let i = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];

    while (sum >= target) {
      minLen = Math.min(minLen, j - i + 1);
      sum -= nums[i];
      i++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
};
console.log(minSubArrayLen([1, 2, 3, 4, 5], 11));
