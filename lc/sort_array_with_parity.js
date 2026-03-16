function sortArrayParity(nums) {
  let leftPtr = 0;
  let rightPtr = 0;

  while (rightPtr < nums.length) {
    console.log(nums, rightPtr,"nums");
    if (nums[rightPtr] % 2 === 0) {
      [nums[leftPtr], nums[rightPtr]] = [nums[rightPtr], nums[leftPtr]];
      leftPtr++;
      rightPtr++;
    } else {
      rightPtr++;
    }
  }

  return nums;
}

console.log(sortArrayParity([5, 2, 7, 8]));
