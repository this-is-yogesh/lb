/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 *
 *
 * put a count as 0 and keep a track of digits from index = 0, if count is less than or equal to 2 then keep mapping the index with current value of i and incrementing the index , if not then just keep increasing the count and when we find a new digit then map the current index with that digit
 */
var removeDuplicates = function (nums) {
  let index = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      count = 1;
    } else {
      count++;
    }
    if (count <= 2) {
      nums[index] = nums[i];
      index++;
    }
  }

  console.log(nums, "index**");
  return index;
};

removeDuplicates([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3]);
