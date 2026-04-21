1. will go from target to root, first calculate the position of nth-child of current target and then add tag name and then, add it at start of selectors array and then make current target as parent and run the loop till root === target

2. :nth-child(n) selects an element based on its position among ALL its siblings and tag:nth-child(n) matches only if It is that tag && it is at position n
<div>
  <p>1</p>
  <li>2</li>
  <li>3</li>
</div>
li:nth-child(1) does not select anything as nth-child(1) is p and it is not li, so li:nth-child(1) means, find element that is li and is 1st child of its parent

3. Select a <p> that is the 2nd child of a div, and is a direct child of that div

4. direct child => div > p , indirect + direct => div p

