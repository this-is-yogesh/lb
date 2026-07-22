
const inViewPort = elm => {
  const eDim = elm.getBoundingClientRect();
  //window.innerHeight and window.innerWidth give the height and width of the viewport, respectively. If these properties are not available, we can use document.documentElement.clientHeight and document.documentElement.clientWidth as fallbacks, which provides us the height and width of the html document which is more or less same as viewport height and width.
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  console.log(elm.textContent, "textContent*", eDim, viewHeight, viewWidth);

  //which ever element is scrolled out of the viewport, the top will be in negative and the element which is not in viewport in bottom, its bottom will be greater than the viewport height
  return (
    eDim.top >= 0 &&
    eDim.left >= 0 &&
    eDim.right <= viewWidth &&
    eDim.bottom <= viewHeight
  );
};

const detect = () => {
  const result = [];
  const blocks = document.querySelectorAll(".blocks");
  blocks.forEach(element => {
    if (inViewPort(element)) {
      result.push(element.textContent);
    }
  });
  console.log(result, "results**");
};

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    console.log("debounce called**", inDebounce);
    //this will clear the timeout if the user scrolls before the delay time is up, and then sets a new timeout. This way, the detect function will only be called after the user has stopped scrolling for 2 seconds.
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(), delay);
  };
};

let debounceDetect = debounce(detect, 2000);

window.addEventListener("scroll", debounceDetect, false);
