const getComputedColor = colorCode => {
  const div = document.createElement("div");
  div.style.color = colorCode;
  document.body.appendChild(div);
  const computedColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);
  return computedColor;
};

console.log(getComputedColor("red"));
console.log(getComputedColor("orange"));
console.log(getComputedColor("#f00"));
console.log(getComputedColor("#ff0000"));
console.log(getComputedColor("rgb(255, 0, 0)"));
console.log(getComputedColor("#000"));

const findElementsByColor = (root, colorCode) => {
  const standardColor = getComputedColor(colorCode);
  const output = [];
  const search = root => {
    const rootColor = root.style.color;
    const computedColor = getComputedColor(rootColor);
    if (computedColor === standardColor) {
      output.push(root);
    }
    for (let child of root.children) {
      search(child);
    }
  };
  search(root);
  return output;
};

const root = document.getElementById("root");
const elements = findElementsByColor(root, "red");
console.log(elements, 'elements');
