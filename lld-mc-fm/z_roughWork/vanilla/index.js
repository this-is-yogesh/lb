/** approach:
 * 
 * we will start my have an array of steps like
 * const steps = ["3", "header", "8", "12", "footer", "5"];
let index = 0;

then we will call the first function which is hightlight and will pass steps index
hightlight(steps[index])

so the overall approach is, we will append two elements to the curret element, one will be the hightlight helper and the other will be the bottom buttons of prev and next

hightlight will get the element by id and pass it out to hightlighthelper and bottom buttons
 */

const steps = ["3", "header", "8", "12", "footer", "5"];
let index = 0;

function highlight(currentElementId) {
  document.getElementById("hightligher-id")?.remove();
  document.getElementById("popover-id")?.remove();  
  let ele = document.getElementById(currentElementId);
  let eleDimensions = ele.getBoundingClientRect();

  highlightHelper(eleDimensions);
  popOverHelper(eleDimensions);
}

function highlightHelper(eleDimensions) {
  let highLighter = document.createElement("div");
  highLighter.setAttribute("id", "hightligher-id");

  highLighter.style = `position:absolute;
  width:${eleDimensions.width}px;
  height:${eleDimensions.height}px;
  left:${eleDimensions.left - 3}px;
  top:${eleDimensions.top - 3}px ;
  transistion: border 0.5s ease
`;

  document.getElementById("wrapper").appendChild(highLighter);
  setTimeout(() => {
    highLighter.style.border = "3px solid black";
  }, 100);
}

function popOverHelper(eleDimensions) {
  let ele = document.createElement("div");
  ele.setAttribute("id", "popover-id");

ele.style = `position:absolute;
  width:180px;
  height:50px;
  left:${(eleDimensions.left + eleDimensions.right) / 2 - 90}px ;
  top:${eleDimensions.bottom + 10}px ;
  background-color:white;
  display:flex;
  justify-content:space-around;
  align-items:center;
  border:1px solid black;
`;

  let fragment = document.createDocumentFragment();
  let prevButton = document.createElement("button");
  prevButton.innerText = "prev";
  prevButton.addEventListener("click", () => {
    if (index > 0) {
      index--;
      highlight(steps[index]);
    }
  });

  let nextButton = document.createElement("button");
  nextButton.innerText = "next";
  nextButton.addEventListener("click", () => {
    if (index < steps.length - 1) {
      index++;
      highlight(steps[index]);
    }
  });

  fragment.appendChild(prevButton);
  fragment.appendChild(nextButton);
  ele.appendChild(fragment);
  document.getElementById("wrapper").appendChild(ele);
}




highlight(steps[index]);
