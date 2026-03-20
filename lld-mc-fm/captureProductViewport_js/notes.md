Problem: if the user STOPS scrolling, we have to DETECT the elements in viewport


1-- if we have to detect the element is in viewport or not, the element should be between the rectangular viewport , that is between left, right, top, bottom

2-- code to generate div blocks through script
    <script>
      /**2--  code to generate blocks */
      document.getElementById("container").innerHTML = Array.from(
        { length: 50 },
        (_, i) => {
          return `<div class="blocks">${i + 1}</div>`;
        },
      ).join("")
    </script>

  .join("") joins all array elements into single string 
  "<div>0</div><div>1</div><div>2</div>"

  3--code to make 3 elements fit into one line and entire page into grid 
main thing to note here is width of blocks we have not given so that makes width takes auto width and it fits accordingly, if we will give a fixed width to block it will take only that width
  
  #container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.blocks {
  height: 100px;
  background-color: red;
  color: white;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;

}

/**4-- code to select element  */
const block = document.querySelector(".blocks");
explain the logic of debounce, detect and inviewport
elm.getBoundingClientRect(); to get element dimension
