/**
 * 
 * Write a function to find all the elements with the given color. Here the color will be provided in any format like, plain text (white), HEXA value (#fff or #ffffff), or RGB value (RGB(255, 255, 255)).
 * 
 * 
 * Input:
<div id="root">
  <span style="color:#fff;">1</span>
<span style="color:#eee;">2</span>
  <span style="color:white;">3</span>
  <span style="color:rgb(255, 255, 255);">4</span>
</div>

findElementByColor(document.getElementById('root'), 'rgb(255, 255, 255)');

Output:
[
<span style="color:#fff;">1</span>,
<span style="color:white;">3</span>,
<span style="color:rgb(255, 255, 255);">4</span>
]
 */

function getComputedColor(colorCode) {
  let ele = document.createElement("div");
  ele.style.color = colorCode;
  document.body.appendChild(ele);
  let targetColor = window.getComputedStyle(ele).color;
  document.body.removeChild(ele);
  return targetColor;
}

function findElementByColor(root, colorCode) {
  let targetColorCode = getComputedColor(colorCode);
  let result = new Array();

  function search(ele) {
    let currentColorCode = getComputedColor(ele.style.color);
    if (currentColorCode === targetColorCode) {
      result.push(ele.innerText);
    }
    for (let child of ele.children) {
      search(child);
    }
  }
  search(root);
  return result
}

console.log(findElementByColor(document.getElementById("root"), "red"));
