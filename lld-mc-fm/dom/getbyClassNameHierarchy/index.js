/**
 * 
 * Write a function getByClassNameHierarchy() in javaScript that takes a path of class names and returns the last element of that path.
 * 
 * Input:
<div class="a" id="a-1">
  <div class="b" id="b-1">
    <div class="c" id="c-1"/>
    <div class="c" id="c-2"/>
  </div>
  <div class="c" id="c-3"/>
</div>

getByClassNameHierarchy("a>b>c");

Output:
[<div class="c" id="c-1"></div>, <div class="c" id="c-2"></div>]
 */

//true direct hierarchy match
function getByClassNameHierarchy(stringPath) {
  let arrPath = stringPath.split(">");
  let index = 0;
  let result = new Array();

  function findLastElement(node, index) {
    if (
      node.classList.contains(arrPath[index]) &&
      index === arrPath.length - 1
    ) {
      result.push(node.id);
      return;
    }
    if (node.classList.contains(arrPath[index])) {
      index++;
    } else if (index > 0) {
      //this is the key point
      //we have already found the first part of the path, but now we encounter a node that doesn't match the current index in the path so we return to the previous index in the path and continue searching for the next part of the path
      return;
    }

    for (let child of node.children) {
      findLastElement(child, index);
    }
  }
  findLastElement(document.body, index);
  console.log(result);
}

getByClassNameHierarchy("a>c");
