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
