
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