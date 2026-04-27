console.log(getAggregateValues("parent"));

/** approach would be, get all the input elements of the parent div and then
 * iterate through them
 */
function getAggregateValues(id) {
  let ele = document.getElementById("parent");
  let inputBlocks = ele.querySelectorAll("input[type=text]");
  return Array.from(inputBlocks).reduce((acc, curr) => {
    let namesArray = curr.name.split(".");
    let temp = acc;
    namesArray.forEach((name, index) => {
      if (!temp[name]) {
        temp[name] = {};
      }
      if (index === namesArray.length - 1) {
        temp[name] = curr.value;
      }
      temp = temp[name];
    });

    return acc;
  }, {});
}
