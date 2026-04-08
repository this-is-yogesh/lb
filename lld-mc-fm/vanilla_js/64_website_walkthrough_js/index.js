/**highlight section
 * popover with next and previous button to move steps
 * scroll to element if not in viewport to highlight
 */

const steps = ["3", "header", "8", "12", "footer", ""];
const highlight = id => {
  document.getElementById("lb-highlight")?.remove();
  document.getElementById("lb-popover")?.remove();
  const element = document.getElementById(id);
  scrollToElement(element);
  const elementDimensions = element.getBoundingClientRect();
  highlightHelper(elementDimensions);
  popover(elementDimensions);
};

const highlightHelper = elementDimensions => {
  let top = elementDimensions.top + window.scrollY;
  let left = elementDimensions.left + window.scrollX;
  let width = elementDimensions.width;
  let height = elementDimensions.height;

  let ele = document.createElement("div");
  ele.id = "lb-highlight";
  ele.style = `position: absolute;
    top: ${top - 2}px; 
    left: ${left - 2}px; 
    width: ${width}px;
    height: ${height}px; 
    transition: border 0.5s ease;
`;

  document.getElementById("wrapper").appendChild(ele);

  setTimeout(() => {
    ele.style.border = `2px solid black`;
  }, 200);
};

const popover = elementDimensions => {
  let bottom = elementDimensions.bottom + window.scrollY;
  let left = elementDimensions.left + window.scrollX;
  let right = elementDimensions.right;
  let center = (left + right) / 2;
  let ele = document.createElement("div");
  ele.id = "lb-popover";
  ele.style = `position: absolute;
    top: ${bottom + 5}px;
    left: ${center - 50}px;
    background: #fff;
    width:100px;
    height: 100px;
;
`;
  ele.appendChild(navigationButton());
  document.getElementById("wrapper").appendChild(ele);
};

const navigationButton = () => {
  const nextButton = document.createElement("button");
  const prevButton = document.createElement("button");
  nextButton.addEventListener("click", () => {
    if (index < steps.length - 1) {
      highlight(steps[++index]);
    }
  });
  prevButton.addEventListener("click", () => {
    if (index > 0) {
      highlight(steps[--index]);
    }
  });
  nextButton.innerText = "next";
  prevButton.innerText = "prev";

  let fragment = document.createDocumentFragment();
  fragment.appendChild(prevButton);
  fragment.appendChild(nextButton);

  return fragment;
};

const scrollToElement = element => {
  const eleTop = element.offsetTop;
  window.scrollTo({ top: eleTop, behavior: "smooth" });
};

let index = 0;
highlight(steps[index]);
