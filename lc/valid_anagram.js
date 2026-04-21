/**
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let sMap = new Map();
  for (let i of s) {
    sMap.set(i, (sMap.get(i) || 0) + 1);
  }
  for (let i of t) {
    if (!sMap.has(i) || sMap.get(i) === 0) {
      return false;
    } else {
      sMap.set(i, sMap.get(i) - 1);
    }
  }
  return true;
};
