/**
 * 
 * 
 * You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path.

The rules of a Unix-style file system are as follows:

A single period '.' represents the current directory.
A double period '..' represents the previous/parent directory.
Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.
The simplified canonical path should follow these rules:

The path must start with a single slash '/'.
Directories within the path must be separated by exactly one slash '/'.
The path must not end with a slash '/', unless it is the root directory.
The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
Return the simplified canonical path


 */

var simplifyPath = function (path) {
  let stack = [];
  let arr = path.split("/");
  console.log(arr);
  for (let part of arr) {
    if (part === "" || part === ".") {
      /**because "." doesn't mean "go up" or "go into a new directory"; it means "stay where you are", so the stack should remain unchanged. */
      continue;
    }

    if (part === "..") {
      if (stack.length) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }
  console.log("stack", stack);

  return "/" + stack.join("/");
};

/**
 * TC: O(n), where n is the length of the input string path. This is because:
 * path.split("/") traverses the entire string once → O(n).
The for...of loop processes each component once → O(n).
stack.join("/") traverses all components once → O(n).


Space Complexity: O(n)
path.split("/") creates an array of substrings.
stack stores the directory names.
 */
