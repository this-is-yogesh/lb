/**
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.


Example 1:

Input: nums = [1,2,3,4]
[1,1,2,6]
[1,2,3,4]
[24,12,4,1]
[24,12,8,6]
Output: [24,12,8,6]
Example 2:

[1,-1,-1,0,0]
[0,0,-9,3,1]
[0,0,9,0,0]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 */

/** intution -
 * “multiply everything on the LEFT of i × everything on the RIGHT of i”
 * for example , for left[1] which is 2, store product of everything on left of it
 * which is basically 1 , same for left[2] which is 3, store everything on left of it which is 1*2 = 2, for left[3] which is 4, store everything on left of it which is 1*2*3 = 6 and we store 1 as left[0] because there is nothing left to it, same concept for right
 * */


var productExceptSelf = function (nums) {
  let resArr = Array.from({ length: nums.length }, () => {
    return 1;
  });
  let rightArr = Array.from({ length: nums.length }, () => {
    return 1;
  });
  let leftPrd = 1;
  for (let i = 0; i < nums.length; i++) {
    resArr[i] = leftPrd;
    leftPrd *= nums[i];
  }
  let rightPrd = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    rightArr[i] = rightPrd;
    rightPrd *= nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    resArr[i] *= rightArr[i];
  }

  return resArr;
};
console.log(productExceptSelf([-1, 1, 0, -3, 3]));
