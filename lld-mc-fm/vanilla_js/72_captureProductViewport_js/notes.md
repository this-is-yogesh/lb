
blocker notes :
1. <link rel="stylesheet" href="index.css" />
2.      document.getElementById("container").innerHTML = Array.from(
        { length: 50 },
        (_, i) => {
          return `<div class="blocks">${i + 1}</div>`;
        },
      ).join("")

  #container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.blocks {
  height: 100px;
  background-color: red;
  color: white;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
}
 
 
3. If an element is in the viewport then its position from top and left will always be greater than or equal to 0. It’s distance from the right will be less than or equal to the total width of the viewport, and it’s distance from the bottom will be less than or equal to the height of the viewport.

To get the width and height of the viewport.
(window.innerWidth || document.documentElement.clientWidth) and for height (window.innerHeight || document.documentElement.clientHeight)


const isInViewport = function (elem) {
     const bounding = elem.getBoundingClientRect();
     return (
       bounding.top >= 0 &&
       bounding.left >= 0 &&
       bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};





1. In simple words if the scroll event is not triggered again within the specified time (assume 5 seconds) then only invoke the function. This is implemented using the setTimeout timer function.

2. const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(), delay);
  };
};

if function has arguments

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};




GENERAL NOTES :

1. so the analogy to understand is the border of the viewport on top of our screen is 0 line, any element bottom touching that will have bottom close to 0 but its top will be negative and as we scroll the element, the element top will be 0 as it now touching the rim of the window and its bottom will be top + height of element
so top is the main thing of viewport 

Any element at bottom of the screen will have large top as its top will be that far from the window top

and so it means the last element bottom will be almost same as the height of entire viewport screen

the same is, the left of the screen is 0 line and the last element on x axis, its right will be almost same as the window.innerWidth



my implementation:

document.getElementById("blocks").innerHTML = Array.from(
  { length: 50 },
  (_, index) => {
    return `<div class='single_block'>${index + 1}</div>`;
  },
).join("");

let blocks = document.querySelectorAll(".single_block");

function checkElementViewport(element) {
  let elementDimenstion = element.getBoundingClientRect();
  return (
    elementDimenstion.top >= 0 &&
    elementDimenstion.left >= 0 &&
    elementDimenstion.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    elementDimenstion.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

function allBlocks() {
  blocks.forEach(block => {
    if (checkElementViewport(block)) {
      console.log("looking at block",block.innerText);
    }
  });
}


function debounce(func) {
  let debounceVal;
  return function () {
    clearTimeout(debounceVal);
    debounceVal = setTimeout(() => {
      func();
    }, 3000);
  };
}

window.addEventListener("scroll", debounce(allBlocks));
