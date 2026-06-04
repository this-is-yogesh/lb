/**
 * 
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 */

class MinHeap {
  constructor() {
    this.minHeap = new Array();
  }
  size() {
    return this.minHeap.length;
  }
  peek() {
    return this.minHeap[0];
  }

  push(val) {
    /**how do you push to heap */
    /** we push to heap by first pushing in the value and then we heapifyUp so that the values in the heap is set accordinly
     * like the parent should always be less than the children in case of minHeap
     * how do we achieve that, so say we pushed in the value then we will check if parent is less than the current index
     */

    this.minHeap.push(val);
    let index = this.size() - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.minHeap[parent] <= this.minHeap[index]) break;

      [this.minHeap[parent], this.minHeap[index]] = [
        this.minHeap[index],
        this.minHeap[parent],
      ];
      index = parent;
    }
  }

  pop() {
    /** now if the heap size grows beyond k, we remove the smallest element from the heap which is by default
     * our first element because that is what we make sure in push
     */
    if (this.size() === 1) return this.minHeap.pop();

    let minimumValue = this.minHeap.pop();
    this.minHeap[0] = minimumValue;
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;
      if (left < this.size() && this.minHeap[left] < this.minHeap[smallest]) {
        smallest = left;
      }
      if (right < this.size() && this.minHeap[right] < this.minHeap[smallest]) {
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

const findKthLargest = function (nums, k) {
  let heapObj = new MinHeap();
  for (let num of nums) {
    heapObj.push(num);

    if (heapObj.size() > k) {
      console.log(heapObj.minHeap, "heapObjfirst");
      heapObj.pop();
      console.log(heapObj.minHeap, "heapObj");
    }
  }
  console.log(heapObj.minHeap, "minheap-");
  return heapObj.peek();
};

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
