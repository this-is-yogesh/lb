/**
 * 
 * @param {
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2

Output: [1,2]

Example 2:

Input: nums = [1], k = 1

Output: [1]

Example 3:

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

Output: [1,2]} nums 
 * @param {*} k 
 * @returns 
 */

// brute force approach
var topKFrequent = function (nums, k) {
  let map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
};

// time complexity: O(n log n) due to sorting the entries of the map
// space complexity: O(n) for the map storing the frequency of each element

//optimised approach

//min heap approach
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2

// Output: [1,2]

// Example 2:

// Input: nums = [1], k = 1

// Output: [1]

// Example 3:

// Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

// Output: [1,2]

/** once i push to min heap , how to push normal value to min heap, we take the parent
 */

class MinHeap {
  constructor() {
    this.minHeap = new Array();
  }

  size() {
    return this.minHeap.length;
  }

  push(val) {
    this.minHeap.push(val);
    let index = this.minHeap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.minHeap[parent][1] <= this.minHeap[index][1]) {
        console.log("breakHeap", this.minHeap);
        break;
      }

      [this.minHeap[parent], this.minHeap[index]] = [
        this.minHeap[index],
        this.minHeap[parent],
      ];
      index = parent;
    }
  }

  pop() {
    if (this.minHeap.length === 1) return this.minHeap.pop();
    console.log("pop", this.minHeap);
    let min = this.minHeap[0];
    this.minHeap[0] = this.minHeap.pop();
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < this.minHeap.length &&
        this.minHeap[left][1] < this.minHeap[smallest][1]
      ) {
        smallest = left;
      }
      if (
        right < this.minHeap.length &&
        this.minHeap[right][1] < this.minHeap[smallest][1]
      ) {
        smallest = right;
      }

      if (smallest === index) break;
      [this.minHeap[smallest], this.minHeap[index]] = [
        this.minHeap[index],
        this.minHeap[smallest],
      ];
      index = smallest;
    }
  }
}
var topKFrequent = function (nums, k) {
  let map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  let minHeap = new MinHeap();
  for (let value of map.entries()) {
    minHeap.push(value);
    if (minHeap.minHeap.length > k) {
      console.log("maxsize");
      minHeap.pop();
    }
  }
  let result = new Array();
  for (let num of minHeap.minHeap) {
    result.push(num[0]);
  }
  return result;
  console.log(result);
};
topKFrequent([1, 2, 3, 3, 3, 3, 3, 4, 4, 4], 2);
