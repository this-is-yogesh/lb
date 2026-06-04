

/**

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".



Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.


What is time complexity of this solution?
 */
var longestCommonPrefix = function (strs) {
    if (!strs.length) {
        return ""
    }
    let curr = strs[0]
    let frq = ""
    for (let i = 0; i < strs.length; i++) {
        let target = strs[i]
        let j = 0;
        frq = ""
        while (j < curr.length && j < target.length) {
            if (curr[j] === target[j]) {
                frq += curr[j];
                j++;
            } else {
                break;
            }
        }
        curr = frq;
        if (!frq) {
            return ""
        }
    }
    return frq
}