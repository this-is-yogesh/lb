
/**problem 
 * 
 * 
 * Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Note that the product of an array with a single element is the value of that element.

 

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 * 
*/


var maxProduct = function (nums) {
  let max = nums[0];
  let min = nums[0];
  let ans = nums[0];

  for (let i = 1; i < nums.length; i++) {
    let curr = nums[i];

    let tempMax = Math.max(curr, max * curr, min * curr);
    let tempMin = Math.min(curr, max * curr, min * curr);
    console.log(max, min, "max-min-1", tempMax, tempMin);

    max = tempMax;
    min = tempMin;

    ans = Math.max(ans, max);
  }

  return ans;
};


/**
 * 
 * approach :
 * 
 * we track the best so far and we also track the worst so far
 * because Today’s worst (negative) can become tomorrow’s best
 * At every index , we consider 3 things:
 * 
 * Start fresh from current number
Extend previous max
Extend previous min (important for negatives)


edge case: [-2,3,-4]
 */