/**
 * You are given an m x n integer matrix matrix with the 
 * following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last 
integer of the previous row.
Given an integer target, return true if target is in
 matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 */


/**
 * explanation:
 * 
 * Since each row is sorted and the first element of a row is greater than the last element of the previous row, the whole matrix behaves like one sorted array. Instead of flattening it (which costs O(mn) space and time), I perform binary search on indices from 0 to m*n-1. For any midpoint mid, I map it back to matrix coordinates using row = Math.floor(mid / cols) and col = mid % cols, giving an overall complexity of O(log(mn)) time and O(1) space.
 */

var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    // Convert 1D index to 2D coordinates
    let row = Math.floor(mid / cols);
    let col = mid % cols;

    let num = matrix[row][col];

    if (num === target) {
      return true;
    } else if (num < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};