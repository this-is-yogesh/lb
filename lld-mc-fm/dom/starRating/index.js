const mainBody = document.querySelector(".main_body");
const fragment = document.createDocumentFragment();

Array.from({ length: 5 }).forEach((_, i) => {
  const star = document.createElement("div");
  star.className = "star";
  star.dataset.index = i;
  fragment.appendChild(star);
});

mainBody.appendChild(fragment);

mainBody.addEventListener("mouseover", fnMouseOver);
mainBody.addEventListener("mouseout", fnMouseOut);

function fnMouseOver(e) {
  if (!e.target.classList.contains("star")) return;
  const index = Number(e.target.dataset.index);
  console.log("index", e.target.classList);
  const stars = mainBody.querySelectorAll(".star");
  stars.forEach((star, i) => {
    if (i <= index) {
      star.classList.add("filled");
    } else {
      star.classList.remove("filled");
    }
  });
}

function fnMouseOut() {
  let stars = document.querySelectorAll(".stars");
  stars.forEach((star) => {
    star.classList.remove("filled");
  });
}
