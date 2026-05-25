// my solution:

function findByClass(targetClass) {
  let result = new Array();

  function findTargetClass(node) {
    if (node.classList.contains(targetClass)) {
      result.push(node.id);
    }

    let children = Array.from(node.children);
    if (!children.length) {
      return;
    }
    for (let child of children) {
      findTargetClass(child);
    }
  }
  findTargetClass(document.body);
  return result;
}

function findByClass(className) {
  let root = document.body;
  let result = new Array();

  function search(node) {
    if (node.classList.contains(className)) {
      result.push(node);
    }
    console.log("node-1", node);
    for (let child of node.children) {
      search(child);
    }
    console.log("node-2", node);
    return result;
  }
  return search(root);
}

console.log(findByClass("a"), "res$");
