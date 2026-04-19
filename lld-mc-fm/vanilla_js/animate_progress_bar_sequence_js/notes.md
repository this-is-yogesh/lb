1. 
let button = document.getElementById("first_button");
let root = document.getElementById("root");

button.addEventListener("click", createProgressBar);

function createProgressBar() {
  let barDiv = document.createElement("div");
  barDiv.style.transition = `width ${3}s ease`;
  barDiv.classList.add("start_progress");
  root.appendChild(barDiv);

  setTimeout(() => {
    barDiv.classList.add("full_width");
  }, 100);
  
}

2. outside setTimeout , change is instant as everything is done together ,first widht 0 is added and then immediately widht 100 is added in one frame only so browser is not able to detect change it just sees width:100% already applied so no new change from old to new value  but in setTimeout 
Element is added with initial class (start_progress)
Browser gets time to render initial state (e.g., width: 0)
After 100ms → you change to full_width (width: 100%)
Browser detects: width: 0 → width: 100%, a change between two rendered states
and instead of setTimeout we can use requestAnimationFrame(() => {
  barDiv.classList.add("full_width");
}); , this ensures 
a. Ensures the first frame is rendered
b. No arbitrary delay
c. More performant + reliable


4. when was doing createProgressBar(count), it was taking 0 because that same count was being used in onTransistionEnd now that createProgressBar(n) then count here is global count