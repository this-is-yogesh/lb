/**
 * 
 * Given a JSON as an object with type, children, and property of DOM element, write a function to convert the object to the actual DOM.
 * 
 * 
 * Input:
const json = { 
  type: 'div', 
  props: { id: 'hello', class: "foo" }, 
  children: [
    {type:'h1', children: 'HELLO' },
    {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
  ]
};

JSONtoHTML(json);

Output:
<div id="hello" class="foo">
  <h1>HELLO</h1>
  <p>
    <span class="bar">World</span>
  </p>
</div>


Input:
const JSON = [
{ 
  type: 'div', 
  props: { id: 'hello', class: "foo" }, 
  children: [
    {type:'h1', children: 'HELLO' },
    {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
  ]
},
{ 
  type: 'section', 
  props: { id: 'hello-2', class: "foo-2" }, 
  children: [
    {type:'h1', children: 'HELLO-2' },
    {type:'p', children: [{type:'span', props: {class: "bar-2" }, children: 'World' }] }
  ]
}];

console.log(JSONtoHTML(json));

Output:
<div id="hello" class="foo">
  <h1>HELLO</h1>
  <p>
    <span class="bar">World</span>
  </p>
</div>
<section id="hello-2" class="foo-2">
  <h1>HELLO-2</h1>
  <p>
    <span class="bar-2">World</span>
  </p>
</section>
 */