/**
 * 
 * Write a function to find all the elements with the given color. Here the color will be provided in any format like, plain text (white), HEXA value (#fff or #ffffff), or RGB value (RGB(255, 255, 255)).
 * 
 * 
 * Input:
<div id="root">
  <span style="color:#fff;">1</span>
<span style="color:#eee;">2</span>
  <span style="color:white;">3</span>
  <span style="color:rgb(255, 255, 255);">4</span>
</div>

findElementByColor(document.getElementById('root'), 'rgb(255, 255, 255)');

Output:
[
<span style="color:#fff;">1</span>,
<span style="color:white;">3</span>,
<span style="color:rgb(255, 255, 255);">4</span>
]
 */