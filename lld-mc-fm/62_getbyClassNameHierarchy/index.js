const findElementbyClassName = (root, path) => {
  let classes = path.split(">");
  let result = [];
  traverseDom(root, classes, 0, result);
  return result;
};

function traverseDom(element, classes, index, result) {
  if (!element) {
    return;
  }

  let targetClass = classes[index];

  if (index === classes.length - 1 && element.classList.contains(targetClass)) {
    result.push(element.id);
    return;
  }

  for (const child of element.children) {
    if (element.classList.contains(targetClass)) {
      traverseDom(child, classes, index + 1, result);
    } else {
      traverseDom(child, classes, 0, result);
    }
  }
}
console.log(
  findElementbyClassName(document.getElementById("a-1"), "a>b>c"),
  "className**",
);
