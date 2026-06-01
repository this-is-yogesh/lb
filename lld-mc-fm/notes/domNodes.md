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

<div id="grandparent">
  <div id="parent">
    <div id="child1"></div>
    <div id="child2"></div>
    <div id="child3"></div>
  </div>
</div>

imp properties like node.children : 

vertical movement : up down

node.children 
document.getElementById("parent").children - [child1, child2, child3]
node.parentElement 
document.getElementById("child2").parentElement.id - parent

node.firstElementChild 
document.getElementById("parent").firstElementChild.id - child1

node.lastElementChild
document.getElementById("parent").lastElementChild.id - child3

horizontal movement : left right

node.nextElementSibling
document.getElementById("child1").nextElementSibling.id - child2
node.previousElementSibling
document.getElementById("child3").previousElementSibling.id - child2

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