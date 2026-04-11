/**
 * Implement a throttler that executes an array of tasks. When the throttler is passed a number, only executes that number of the tasks and passes the other tasks into a queue.

Example
Input:
const task = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const count = 5;

throttle(task, count, 2000); // [1, 2, 3, 4, 5] // immediately 
throttle(task, count, 2000); // [6, 7, 8, 9, 10] // after 2 seconds
throttle(task, count, 2000); // [1, 2, 3, 4, 5] // after 2 seconds
 */