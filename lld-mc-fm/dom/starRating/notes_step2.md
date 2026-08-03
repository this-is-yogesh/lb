# Event Delegation & `data-*` Attributes (Interview Notes)

---

# 1. What is Event Delegation?

Event delegation is a JavaScript technique where **instead of attaching event listeners to multiple child elements, we attach a single event listener to their common parent** and use **event bubbling** to determine which child triggered the event.

Instead of this:

```js
star1.addEventListener("click", fn);
star2.addEventListener("click", fn);
star3.addEventListener("click", fn);
star4.addEventListener("click", fn);
star5.addEventListener("click", fn);
```

We do:

```js
mainBody.addEventListener("click", fn);
```

Only one listener is required.

---

# 2. Why does Event Delegation work?

It works because of **Event Bubbling**.

Whenever an event occurs on an element, the event doesn't stop there.

It travels (bubbles) up through its ancestors.

Example DOM:

```
document
   │
 html
   │
 body
   │
main_body
   │
 ├── star0
 ├── star1
 ├── star2
 ├── star3
 └── star4
```

Suppose the user hovers over **star3**.

The browser fires the event like this:

```
star3
   │
   ▼
main_body
   │
   ▼
body
   │
   ▼
html
   │
   ▼
document
```

Since the event eventually reaches `main_body`, our single event listener executes.

---

# 3. What is event.target?

`event.target` is

> **The element that originally triggered the event.**

Example:

```js
mainBody.addEventListener("mouseover", (e) => {
    console.log(e.target);
});
```

Hover over star3.

Output:

```html
<div class="star" data-index="3"></div>
```

Even though the listener is attached to `main_body`,
`event.target` is still the star.

---

# 4. What is event.currentTarget?

Interviewers often ask this.

Remember:

```
target
=
Where the event happened.

currentTarget
=
Where the listener is attached.
```

Example:

```js
mainBody.addEventListener("mouseover", (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
});
```

Hover over star3.

Output:

```
event.target

↓

star3
```

```
event.currentTarget

↓

main_body
```

Easy way to remember:

> target = Triggered element

> currentTarget = Listening element

---

# 5. Why use Event Delegation?

## Advantage 1 — Fewer event listeners

Without delegation:

```
star0 -> listener

star1 -> listener

star2 -> listener

star3 -> listener

star4 -> listener
```

Total listeners = 5

With delegation:

```
main_body

↓

One listener
```

Memory usage is lower.

---

## Advantage 2 — Better scalability

Suppose tomorrow your application has

- 10 stars
- 100 stars
- 1000 stars

Without delegation:

```
1000 listeners
```

With delegation:

```
Still one listener
```

---

## Advantage 3 — Dynamic Elements

Imagine we later do

```js
const star = document.createElement("div");
mainBody.appendChild(star);
```

Without delegation:

We must remember to attach another listener.

With delegation:

No changes are required.

The parent automatically receives events from newly created children.

---

## Advantage 4 — Easier Maintenance

Instead of maintaining multiple listeners

```js
star1.addEventListener(...)
star2.addEventListener(...)
star3.addEventListener(...)
```

there is only

```js
mainBody.addEventListener(...)
```

Less code.

Less duplication.

---

# 6. Why do we check classList.contains()?

Example:

```js
mainBody.addEventListener("mouseover", (e) => {

    if (!e.target.classList.contains("star"))
        return;

});
```

Why?

Because the parent may contain other elements later.

Example:

```
main_body

├── star

├── star

├── star

└── button
```

If the user hovers the button,

we don't want star logic to execute.

So we filter the event.

---

# 7. Why use dataset.index?

Instead of

```js
star.id = i;
```

we do

```js
star.dataset.index = i;
```

HTML becomes

```html
<div class="star" data-index="3"></div>
```

Now we can access it.

```js
e.target.dataset.index
```

returns

```
"3"
```

---

# 8. What is data-* ?

HTML provides custom attributes called

```
data-*
```

They are meant specifically for storing custom data.

Example:

```html
<div
    data-index="2"
    data-rating="4"
    data-user="Yogesh">
</div>
```

JavaScript:

```js
element.dataset.index
element.dataset.rating
element.dataset.user
```

Very clean.

---

# 9. Why not use id?

You can.

Example:

```html
<div id="3"></div>
```

Nothing is wrong.

But IDs are intended for

- unique identification
- CSS selectors
- anchor links
- querying elements

Whereas

```
data-index
```

means

> "This is application data."

It expresses intent better.

---

# 10. Why not use class?

Some beginners do

```html
<div class="star 3"></div>
```

Now there are two classes

```
star

3
```

Classes should represent

- styling
- categories
- CSS grouping

Not application data.

So

```
data-index
```

is preferred.

---

# 11. Why convert dataset.index to Number?

dataset always returns strings.

Example:

```js
console.log(typeof e.target.dataset.index);
```

Output

```
string
```

Therefore

```js
Number(e.target.dataset.index)
```

is safer.

Otherwise

```js
"3" + 1
```

becomes

```
31
```

instead of

```
4
```

---

# 12. Event Delegation Flow

User hovers star4.

```
Hover

↓

Browser fires mouseover

↓

Target = star4

↓

Event bubbles

↓

main_body listener executes

↓

event.target is star4

↓

Read data-index

↓

Fill stars till index
```

---

# 13. Time Complexity

Suppose there are N stars.

Creation

```
O(N)
```

Hover

```
O(N)
```

(Mouse fills stars till hovered index.)

Space

```
O(N)
```

if storing star references.

Since N = 5,

this is effectively constant time in practice.

---

# 14. Interview Follow-up Questions

## Why event delegation?

Because it reduces the number of event listeners,
improves memory usage,
works with dynamically added elements,
and simplifies maintenance.

---

## Why event.target?

It identifies the element that originally triggered the event.

---

## Difference between target and currentTarget?

target

→ element that triggered the event.

currentTarget

→ element on which the listener is attached.

---

## Why use dataset?

Because HTML5 provides `data-*` attributes specifically for storing custom metadata on DOM elements.

---

## Why not id?

IDs identify elements.

`data-*` stores application data.

---

## Why not class?

Classes are meant for styling and grouping,
not storing data.

---

## Does event delegation work for dynamically created elements?

Yes.

Since the listener is attached to the parent,

new child elements automatically participate.

---

## When should you NOT use event delegation?

Avoid it when:

- The event does not bubble (e.g., `focus`, `blur` in their native forms).
- Every child needs very different behavior and delegation makes the logic harder to understand.
- The parent receives an extremely high volume of unrelated events and filtering becomes expensive.

---

# 15. Senior-Level Interview Answer (5 YOE)

> I used event delegation by attaching a single event listener to the parent container instead of individual listeners on every star. Since mouse events bubble through the DOM, the parent receives the event and `event.target` identifies which child triggered it. This reduces the number of event listeners, improves memory efficiency, works seamlessly for dynamically added elements, and makes the implementation easier to maintain. I also stored each star's index using a `data-index` attribute because HTML5 `data-*` attributes are the standard way to associate custom metadata with DOM elements. This keeps application data separate from styling (`class`) and element identity (`id`), resulting in cleaner and more maintainable code.