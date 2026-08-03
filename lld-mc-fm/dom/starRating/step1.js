//create 5 star ui and render filled till indexconst mainBody = document.querySelector(".main_body");
const fragment = document.createDocumentFragment();

const stars = [];

Array.from({ length: 5 }).forEach((_, i) => {
  const star = document.createElement("div");
  star.className = "star";
  star.dataset.index = i;

  star.addEventListener("mouseover", fnMouseOver);
  star.addEventListener("mouseout", fnMouseOut);

  stars.push(star);
  fragment.appendChild(star);
});

mainBody.appendChild(fragment);

function fnMouseOver(e) {
  const index = Number(e.target.dataset.index);

  stars.forEach((star, i) => {
    star.style.backgroundColor = i <= index ? "yellow" : "white";
  });
}

function fnMouseOut() {
  stars.forEach(star => {
    star.style.backgroundColor = "white";
  });
}
