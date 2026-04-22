getElementByClassNameHierarchy(document.getElementById("root"), "a>b>c");

function getElementByClassNameHierarchy(element, classNames) {
  let classArr = classNames.split(">");
  let result = new Array();
  targetDom(element, classArr, 0, result);
}

function targetDom(element, classArr, index, result) {
  if (!element) {
    return;
  }
  let targetClass = classArr[index];
  if (
    index === classArr.length - 1 &&
    element.classList.contains(targetClass)
  ) {
    result.push(element);
    return;
  }

  for (let child of element.children) {
    if (element.classList.contains(targetClass)) {
      targetDom(child, classArr, index + 1, result);
    } else {
      targetDom(child, classArr, 0, result);
    }
  }
}
