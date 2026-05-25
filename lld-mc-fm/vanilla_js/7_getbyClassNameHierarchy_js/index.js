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
      //this is the key
      return;
    }

    for (let child of node.children) {
      console.log(node.id, child.id, index);
      findLastElement(child, index);
    }
  }
  findLastElement(document.body, index);
  console.log(result);
}

getByClassNameHierarchy("a>c");
