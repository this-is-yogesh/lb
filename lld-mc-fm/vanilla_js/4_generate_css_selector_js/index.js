let root = document.getElementById("root");
let target = document.getElementById("target");

function cssGenerateSelector(root, target) {
  const selectors = new Array();
  while (root !== target) {
    let nth = Array.from(target.parentNode.children).indexOf(target) + 1;
    let selector = `${target.tagName.toLowerCase()}:nth-child(${nth})`;
    selectors.unshift(selector);
    target = target.parentNode;
  }
  if (root === target) {
    selectors.unshift(`#${target.id}`);
  }

  return selectors.join(">");
}

console.log(cssGenerateSelector(root, target));
