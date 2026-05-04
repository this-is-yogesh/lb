async function addElements() {
  const res = await fetch("./question.json");
  const arr = await res.json();
  console.log(arr, "err");
  if (arr.length > 0) {
    let mainConatiner = document.getElementById("questions");
    let elementFragment = document.createDocumentFragment();
    let count = 0;
    arr.forEach(video => {
      let a = document.createElement("a");
      a.href = video.link;
      a.textContent = `${++count} ${video.title}`;
      a.target = "_blank";
      a.style.color = "blue";
      if (video.done) {
        a.style.color = "green";
      }
      elementFragment.appendChild(a);
      elementFragment.appendChild(document.createElement("br"));
    });
    mainConatiner.appendChild(elementFragment);
  }
}

addElements();
