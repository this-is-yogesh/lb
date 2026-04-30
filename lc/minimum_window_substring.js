/**
 * 
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.


Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.


edge case :
s ="bdab"
t = "ab"

Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 */

var minWindow = function (s, t) {
  let sMap = new Map();
  let tMap = new Map();

  for (let i = 0; i < t.length; i++) {
    tMap.set(t[i], (tMap.get(t[i]) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let formed = 0;
  let minLength = Infinity;
  let ans = [];

  while (right < s.length) {
    sMap.set(s[right], (sMap.get(s[right]) || 0) + 1);

    if (tMap.has(s[right]) && sMap.get(s[right]) === tMap.get(s[right])) {
      formed++;
    }

    while (left <= right && formed === tMap.size) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        ans = [left, right];
      }
      sMap.set(s[left], sMap.get(s[left]) - 1);

      if (tMap.has(s[left]) && sMap.get(s[left]) < tMap.get(s[left])) {
        formed--;
      }
      left++;
    }

    right++;
  }
  return s.substring(ans[0], ans[1] + 1) || "";
};

minWindow("ADOBECODEBANC", "ABC");
