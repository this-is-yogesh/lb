var searchRange = function (nums, target) {
  return [findFirstPosition(nums, target), findLastPosition(nums, target)];
};

function findFirstPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let ans = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      ans = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

function findLastPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let ans = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      ans = mid;
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}
