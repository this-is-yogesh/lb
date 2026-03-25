/**1-- Create a mock server that will mimick the network with latency and return similar suggestion
 * n is the chance of failing,
 * say getRandomBool(2) = 50% chance of success
 * getRandomBool(10) = 10% chance of success
 * getRandomBool(100) = 1% chance of success
 */

const FAILURE_COUNT = 10;
const networkLatency = 200;
function getRandomBool(n) {
  let threshold = 1000;
  if (n > threshold) threshold = n;
  return Math.floor(Math.random() * threshold) % n === 0;
}
function getSuggestion(str) {
  let pre = "pre";
  let post = "post";
  let result = new Array();

  if (getRandomBool(2)) {
    result.push(pre + str);
  }
  if (getRandomBool(2)) {
    result.push(str);
  }
  if (getRandomBool(2)) {
    result.push(str + post);
  }
  if (getRandomBool(2)) {
    result.push(pre + str + post);
  }

  return new Promise((resolve, reject) => {
    let randomTimeout = Math.random() * networkLatency;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject("Failed count->");
      } else {
        resolve(result);
      }
    }, randomTimeout);
  });
}
/** */

(function () {
  const input = document.getElementById("search");
  const suggestionArea = document.getElementById("suggestion-area");

  /** 2-- when input is in focus, make the suggestion area visible and when clicked outside, it should hide*/
  input.addEventListener("focus", onFocus);
  // input.addEventListener("blur", onBlur);
  window.addEventListener("click", onBlur);

  function onFocus() {
    suggestionArea.style.display = "block";
  }
  function onBlur() {
    suggestionArea.style.display = "none";
  }
  /***/

  /** 5-- populating input box with suggestion item when click on suggestion item
   *
   * we can either add an onclick on the suggestion list item or we can do is we add click listener on the suggestion area itself and get the innerText or innerContent by doing e.target.innerText/innerContent
   * one problem we faced here was as soon as we clicked on suggestion , suggestionarea was hiding because of  input.addEventListener("blur", onBlur); so we now add addEventListener on windows so that clicking on windows will trigger on blur, clicking on input or suggestionarea will not trigger
   *
   */

  suggestionArea.addEventListener("click", onclick);
  function onclick() {}
  /** */

  /** 3-- when user types something input , make api call and show the realitve suggestions
   * release the key : keyup
   * press the key : keydown
   * we can trigger api on any of these
   * try catch block because, our api func getSuggest can fail randomly
   * we need to clear the suggestion list if there are no value being passed
   *
   */
  input.addEventListener("keyup", onChange);
  function onChange(e) {
    const { value } = e.target;
    processedHelperFun(value);
    console.log(e.target.value);
  }
  const processedHelperFun = async value => {
    suggestionArea.innerHTML = "";
    if (!value) {
      return;
    }
    try {
      const resp = await getSuggestion(value);
      /** 4-- creating list to store suggestion
       *
       * there was a gap in the suggestion points, it was because  suggestionArea was not getting cleared before other list was appending
       *
       */

      if (resp.length > 0) {
        const list = document.createElement("ul");
        resp.forEach(suggestion => {
          const listItem = document.createElement("li");
          listItem.innerText = suggestion;
          list.appendChild(listItem);
        });
        suggestionArea.innerHTML = "";
        suggestionArea.appendChild(list);
      }

      /** */
    } catch (e) {
      console.error("Error while making network call", e);
    }
  };
  /** */
})();
