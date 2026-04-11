

function throttleFunction(func, delay) {
  let lastSetTimeoutFunc;
  let lastRanTime;
  return () => {
    if (!lastRanTime) {
      func();
      lastRanTime = Date.now();
    } else {
      clearTimeout(lastSetTimeoutFunc);
      lastSetTimeoutFunc = setTimeout(
        () => {
          if (Date.now() - lastRanTime >= delay) {
            func();
            lastRanTime = Date.now();
          }
        },
        delay - (Date.now() - lastRanTime),
      );
    }
  };
}

let btn = document.getElementById("first_button");
function callback() {
  return console.log("HOLA! oppo", new Date().toUTCString());
}

let cb = throttleFunction(callback, 3000);
btn.addEventListener("click", cb);
