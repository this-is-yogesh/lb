let root = document.getElementById("root");
let target = document.getElementById("target");

function generateCSSSelector(root, target) {
  let selectors = new Array();
  while (root !== target) {
    let position = Array.from(target.parentNode.children).indexOf(target) + 1;
    let selector = `${target.tagName.toLowerCase()}:nth-child(${position})`;
    target = target.parentNode;
    selectors.unshift(selector);
    generateCSSSelector(root, target);
  }
  let r = `#${target.id}`;
  selectors.unshift(r);
  return selectors.join(">");
}

console.log(generateCSSSelector(root, target));
