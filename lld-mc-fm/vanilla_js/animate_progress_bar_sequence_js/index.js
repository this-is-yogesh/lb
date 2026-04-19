let button = document.getElementById("first_button");
let root = document.getElementById("root");
let cnt = document.getElementById("cnt");
let queue = document.getElementById("queue");
queue.style.display = "none";
let count = 0;
cnt.innerText = count;

button.addEventListener("click", () => {
  count++;
  cnt.innerText = count;
  if (count === 1) {
    createProgressBar(count);
  }
});

function createProgressBar(n) {
  let barDiv = document.createElement("div");
  barDiv.style.transition = `width ${n}s ease`;
  barDiv.classList.add("start_progress");
  root.appendChild(barDiv);
  setTimeout(() => {
    barDiv.classList.add("full_width");
  }, 100);

  function onTransistionEnd() {
    count--; // takes global count
    if (count >= 1) {
      cnt.innerText = count;
      createProgressBar(count);
    }
    barDiv.removeEventListener("transitionend", onTransistionEnd);
  }

  barDiv.addEventListener("transitionend", onTransistionEnd);
}
