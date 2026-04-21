function createProgressBar() {
  let bar = document.createElement("div");
  bar.classList.add("progress_bar");
  bar.style.transition = `width ${3}s ease`;
  setTimeout(() => {
    bar.classList.add("full-width");
  }, 100);

  // function onTransistionEnd(){
  //   count--;
  //   if(count >=1)
  // }
  //bar.addEventListener('transitionend',onTransistionEnd)
}
