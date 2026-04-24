/**
 * Given a string s, find the length of the longest substring without duplicate characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let max = -1;
    let j = 0;

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            max = Math.max(max, map.size);
            while (j <= map.get(s[i]) && j < s.length) {
                map.delete(s[j]);
                j++;
            }
            map.set(s[i], i)

        } else {
            map.set(s[i], i)

        }
    }
    max = Math.max(max, map.size);
    return max === -1 ? s.length : max;
};
/**
 *  Why it’s still O(n) despite the loop

Think of it like:

The while loop doesn’t restart from 0 every time
It continues from where j left off

So across the whole program, j++ happens at most n times total
 */