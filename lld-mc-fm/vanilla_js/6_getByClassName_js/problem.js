/**
 * 
 * Write a custom function to find all the elements with the given class in the DOM. Simply put, write the polyfill for the getElementByClassName();
 * 
 * Input:
<div class='a' id="root">
  <div class='b' id='b-1'>
    <div class='a' id='a-2'>
      <div class='d' id='d-1'></div>
    </div>
    <div class='c' id='c-1'>
      <div class='a' id='a-3'>
        <div class='d' id='d-2'></div>
      </div>
    </div>
  </div>
</div>

findByClass('a');

Output:
[<div class="a" id="root">
  <div class="b" id="b-1">
    <div class="a" id="a-2">
      <div class="d" id="d-1"></div>
    </div>
    <div class="c" id="c-1">
      <div class="a" id="a-3">
        <div class="d" id="d-2"></div>
      </div>
    </div>
  </div>
</div>,
<div class="a" id="a-2">
      <div class="d" id="d-1"></div>
</div>,
<div class="a" id="a-3">
       <div class="d" id="d-2"></div>
</div>
]


Write polyfill for document.getElementsByClassName("a"), custom function should be findByClass("a")
 */