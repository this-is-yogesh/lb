1. throttling function
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
let cb = throttleFunction(() => {
  console.log(new Date(Date.now()).toUTCString(), "clicked");
}, 2000);
btn.addEventListener("click", cb);







GENERAL NOTES :
1. Then what is the difference between debouncing and throttling?
Debouncing:- It is used to invoke/call/execute function only when things have stopped happening for a given specific time. For example, Call a search function to fetch the result when the user has stopped typing in the search box. If the user keeps on typing then reset the function.

Throttling:- It is used to restrict the no of times a function can be called/invoked/executed. For example, making an API call to the server on the user’s click. If the user spam the click then also there will be specific calls only. Like, make each call after 10 seconds.


main concept of throttling :
The throttling function , the main concept is , the difference between the current Date.now() and the one last captured, keeps on increasing and once it goes over the top of the delay , the setTimeout gets triggered which was created when we were spamming the button

key word of throttling - user spams and makes continous api calls so we restrict and make those calls once in certain delay

main concept of debouncing :
The user is continously calling the api, but the api only gets called once the user stops and a certain time has passed, then the last setTimeout created gets called 

key word of debouncing - user continously does something and then stops to do that then we make the api call instead of continously making it


