const root = document.getElementById("root");
const startProgress = document.querySelector(".startProgress");

let count = 0;

startProgress.addEventListener("click", () => {
  count++;

  if (count === 1) {
    createProgressBar(count);
  }

  console.log(count, "cnt");
});

function createProgressBar(n) {
  let ele = document.createElement("div");
  ele.classList.add("progressBar");
  ele.style.transition = `width ${n}s ease`;

  root.appendChild(ele);

  setTimeout(() => {
    ele.classList.add("fullWidth");
  }, 100);
  const onTransitionEnd = () => {
    console.log(count, "cntEnd");

    count--;

    if (count >= 1) {
      createProgressBar(count);
    }

    ele.removeEventListener("transitionend", onTransitionEnd);
  };
  ele.addEventListener("transitionend", onTransitionEnd);

}
