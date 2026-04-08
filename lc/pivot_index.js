var pivotIndex = function (nums) {
  let leftSum = 0;
  let rightSum = 0;

  for (let i = nums.length - 1; i >= 0; i--) {
    rightSum += nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    if (rightSum - (leftSum + nums[i]) === leftSum) {
      return i;
    }
    leftSum += nums[i];
  }
  return -1;
};

/** explain the approach */
