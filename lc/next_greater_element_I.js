/**The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

 

Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1. */

var nextGreaterElement = function (nums1, nums2) {
  let monotonicStack = new Array();
  let ansMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    while (
      monotonicStack.length &&
      nums2[i] > monotonicStack[monotonicStack.length - 1]
    ) {
      ansMap.set(monotonicStack.pop(), nums2[i]);
    }
    monotonicStack.push(nums2[i]);
  }
  while (monotonicStack.length) {
    ansMap.set(monotonicStack.pop(), -1);
  }
  for (let j = 0; j < nums1.length; j++) {
    nums1[j] = ansMap.get(nums1[j]);
  }
  return nums1;
};
/** this monotonic stack is in strictly decreasing order, meaning any future element 
 * that is greater than the top of the stack will pop all elements smaller than it until it finds a greater element or the stack is empty.
 */
/** time complexity :
 * n beings nums2.length and m being nums1.length
 * Even though there is a nested while loop:
 * each element is:
pushed once
popped once
So total stack operations across the entire algorithm are:2n which simplifies to O(n)

Space complexity : O(n) + O(n) for stack and map respectively, which simplifies to O(n)
 */