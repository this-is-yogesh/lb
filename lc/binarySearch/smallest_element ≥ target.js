/**
 * 
sample input = [1,2,4,4,4,7]
lower bound target = 4,meaning first element which is <= 4 then  index 2 nums 4
 */

function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length; // Note: Starts at nums.length, not length - 1

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1; // mid is too small; exclude it
    } else {
      right = mid; // mid could be the answer; keep it in range
    }
  }
  return left; // left is the exact boundary point
}

function upperBound(nums, target) {
  let left = 0;
  let right = nums.length; // Note: Starts at nums.length, not length - 1

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] <= target) {
      left = mid + 1; // mid is too small; exclude it
    } else {
      right = mid; // mid could be the answer; keep it in range
    }
  }
  return left; // left is the exact boundary point
}
