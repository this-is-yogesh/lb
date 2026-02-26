/**
 * Two Pointers - Converging (Sorted Array Target Sum) :
 * Logic : should be sorted array,Start at opposite ends, move inward.
 * If sum < target → move left++
If sum > target → move right--
If equal → record result


 * Two Pointers - Fast & Slow (Cycle Detection)
Logic:
Fast moves 2 steps
Slow moves 1 step
If they meet → cycle exists.

Two Pointers - Fixed Separation (Nth Node from End)
Logic:
Maintain constant gap between them.
Move fast k steps
Move both together
When fast reaches end → slow is answer

Two Pointers - In-place Array Modification
Logic:
One pointer reads
One pointer writes
If condition met → write++ and place element
Otherwise skip
 * 
 */
