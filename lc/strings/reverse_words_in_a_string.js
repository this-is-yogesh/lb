/**
Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

 

Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

Time complexity of this solution is O(n) where n is the length of the string s. We split the string into words, reverse the array of words, filter out any empty strings (which may occur due to multiple spaces), and then join the words back into a single string. Each of these operations takes O(n) time in total.
 */
var reverseWords = function (s) {
  return s
    .split(" ")
    .reverse()
    .filter(word => word.length)
    .join(" ");
};
