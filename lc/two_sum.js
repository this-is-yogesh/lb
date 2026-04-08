let twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (!map.size) {
      map.set(nums[i], i);
      continue;
    }
    let secondNum = target - nums[i];
    if (map.has(secondNum)) {
      return [map.get(secondNum), i];
    } else {
      map.set(nums[i], i);
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
console.log(twoSum([3, 2, 4], 6)); // [1,2]
console.log(twoSum([3, 3], 6)); // [0,1]

/**revision ups 
 * 
 * 1. explain your approach, why using a map
 * 2. can you do it in space o(1) time o(n)
 */