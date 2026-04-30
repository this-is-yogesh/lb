/**
 * 
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]
 */

//my solution
function groupAnagrams(strs) {
  let obj = {};
  let ans = new Array();

  for (let i = 0; i < strs.length; i++) {
    let sorted = strs[i]
      .split("")
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    if (!obj[sorted]) {
      obj[sorted] = new Array();
    }
    obj[sorted].push(strs[i]);
  }
  for (let i in obj) {
    ans.push(obj[i]);
  }
  console.log(ans);
  return ans;
}

//optimal solution
function groupAnagrams(strs) {
  let map = new Map();
  // TC: O(1)

  for (let str of strs) {
    // TC: O(n) → n = number of strings

    let count = new Array(26).fill(0);
    // TC: O(26) ≈ O(1)

    for (let char of str) {
      // TC: O(k) → k = length of string

      count[char.charCodeAt(0) - 97]++;
      // TC: O(1)
    }

    let key = count.join("#");
    // TC: O(26) ≈ O(1)

    if (!map.has(key)) {
      // TC: O(1)
      map.set(key, []);
      // TC: O(1)
    }

    map.get(key).push(str);
    // TC: O(1)
  }

  return Array.from(map.values());
  // TC: O(n)
}