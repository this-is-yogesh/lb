function throttleFunction(func, delay) {
  let lastRanTime;
  let lastFun;

  return () => {
    if (!lastRanTime) {
      lastRanTime = Date.now();
      func();
    } else {
      clearTimeout(lastFun);
      lastFun = setTimeout(
        () => {
          if (Date.now() - lastRanTime >= delay) {
            lastRanTime = Date.now();
            func();
          }
        },
        delay - (Date.now() - lastRanTime),
      );
    }
  };
}

let btn = document.getElementById("first_button");
let cb = throttleFunction(() => {
  console.log(new Date(Date.now()).toUTCString(), "clicked");
}, 2000);
btn.addEventListener("click", cb);
