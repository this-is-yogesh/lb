/** 
 * Given a string s, return true if the s can be palindrome after deleting at most one character from it.

 

Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false
 */

/** how will we solve this, so we will a run a two pointer ofcourse from both ends, the first end then the moment
 * we get diffrent values on both pointers, means palindrome was not respected so will, take the presnet left value and the right - 1 value
 * and go for the palindrome check and also check the left + 1 value and current right value, that way we will make sure,
 * that we give another chance to check if palindrome exist now and if now also it doesnt respect ,will return false
 */
function findValindPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return (
        checkPalindrome(left + 1, right, str) ||
        checkPalindrome(left, right - 1, str)
      );
    }
    left++;
    right--;
  }
  return true;
}

function checkPalindrome(left, right, str) {
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(findValindPalindrome("abca"));
