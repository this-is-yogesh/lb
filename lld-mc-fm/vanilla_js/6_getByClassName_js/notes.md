1. node.classList.contains

imp methods for node.classList
ex:
<div id="box" class="red big"></div>
const box = document.getElementById("box");
box.classList will be DOMTokenList ['red', 'big']
classList.contains()
classList.add()
classList.remove()
classList.toggle() - Adds class if absent,removes if present.

2. node.children

imp properties like node.children : 
node.children 
node.parentElement 
node.firstElementChild 
node.lastElementChild
node.nextElementSibling
node.previousElementSibling

imp diff between children vs childNodes
children includes only Only HTML elements and ignores text nodes, comments ,whitespace
example:
<div id="parent">

  Hello

  <p id="child">Hi</p>

  <!-- comment -->

</div>

parent.children will give only element that is  <p id="child"> 
but for childNodes, browser see it like this 
div#parent
 ├── #text ("\n  Hello\n  ")
 ├── <p id="child">
 ├── #text ("\n  ")
 ├── <!-- comment -->
 ├── #text ("\n")
so parent.childNodes will give will give [#text,<p>,#text,comment,#text]
and hence parent.childNodes[0] gives #text and parent.children[0] gives <p>



3. dont have to do Array.from(node.children) as node.children is alreay iterable