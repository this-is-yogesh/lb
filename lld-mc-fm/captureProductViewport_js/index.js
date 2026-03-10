const block = document.querySelector(".blocks");
console.log(block.getBoundingClientRect(), "getBoundingclient");

const inViewPort = elm => {
  const eDim = elm.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  console.log(elm.textContent, "textContent*", eDim, viewHeight, viewWidth);
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
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

let debounceDetect = debounce(detect, 1000);

window.addEventListener("scroll", debounceDetect, false);
