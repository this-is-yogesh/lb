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

//my approach: using set to store the unique characters, if we encounter a duplicate character, we will remove all the characters until we find the duplicate character and then add the duplicate character to the set, and keep track of the maximum size of the set at each step.
//time complexity can be O(n2) in the worst case when the character repeats only at the end and we had to remove all the characters from the set
//example :a,b,c,d,e,f,g,a

function lengthOfLongestSubstring(s) {
  let set = new Set();
  let maxSize = 0;
  let j = 0;
  for (let num of s) {
    if (!set.size) {
      set.add(num);
      continue;
    }

    if (set.has(num)) {
      for (let value of set) {
        if (value === num) {
          set.delete(value);
          break;
        } else {
          set.delete(value);
        }
      }
    }
    set.add(num);
    maxSize = Math.max(maxSize, set.size);
  }
  return !maxSize ? s.length : maxSize;
  console.log(set, maxSize);
}

// so optimal would be to use left and right pointer with set
function lengthOfLongestSubstring(s) {
  let set = new Set();
  let maxSize = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxSize = Math.max(maxSize, right - left + 1);
  }
  return maxSize;
}
