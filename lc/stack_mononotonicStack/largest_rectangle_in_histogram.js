/**
 * 
 * Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
 * 
 * Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Input: heights = [2,4]
Output: 4
 */

var largestRectangleArea = function (heights) {
    let stack = new Array();
    heights.push(0);
    let maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
            let height = heights[stack.pop()];
            let leftSmallerIndex = stack.length ? stack[stack.length - 1] : -1;
            let width = i - leftSmallerIndex - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    console.log(maxArea, "maxArea");
    return maxArea;
};