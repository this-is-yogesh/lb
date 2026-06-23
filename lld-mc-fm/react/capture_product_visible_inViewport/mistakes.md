1. Using a Single Ref for Multiple Elements
❌ What I did
const gridRef = useRef();

{array.map((value) => (
  <div ref={gridRef}>
    {value}
  </div>
))}

Since the same ref was attached to every element, each assignment overwrote the previous one.

Internally, React does something like:

gridRef.current = firstDiv;
gridRef.current = secondDiv;
...
gridRef.current = lastDiv;

Therefore:

gridRef.current === lastDiv;

and only the last element was observed.

✅ Correct approach

Store an array of refs:

const elementsRef = useRef([]);

ref={(el) => (elementsRef.current[index] = el)}


2. Recreating the Ref Array on Every Render
❌ What I did
const elementsRef = useRef();

elementsRef.current = new Array();

This runs on every render and wipes out previously stored refs.
✅ Correct approach

Initialize the array once:

const elementsRef = useRef([]);

3. How IntersectionObserver Is Used
Step 1: Create an observer
const observer = new IntersectionObserver(callback, options);
Step 2: Observe each element
elementsRef.current.forEach((element) => {
  observer.observe(element);
});
Step 3: Browser tracks visibility

Whenever an observed element enters or leaves the viewport, the browser invokes:

callback(entries, observer)

where entries contains information about the affected elements.

Example:

entries.forEach((entry) => {
  if (entry.isIntersecting) {
    console.log(entry.target.innerText, "visible");
  } else {
    console.log(entry.target.innerText, "hidden");
  }
});


4.Flow of code


```jsx
const elementsRef = useRef([]);
useOnScreenHook(elementsRef);

{array.map((value, index) => (
  <div
    ref={(el) => (elementsRef.current[index] = el)}
  >
    {value}
  </div>
))}
```

and inside the hook:

```js
useEffect(() => {
  const observer = new IntersectionObserver(callback);

  elementsRef.current.forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

---

# Flow of Execution

## 1. Grid component renders

```jsx
<Grid />
```

runs once.

---

## 2. `useRef([])` executes

```js
const elementsRef = useRef([]);
```

React creates:

```js
elementsRef.current = []
```

This object survives future renders.

---

## 3. `useOnScreenHook(elementsRef)` is called

This happens **every render** because hooks are just functions.

```js
useOnScreenHook(elementsRef);
```

However, the `useEffect` inside it:

```js
useEffect(() => {
    ...
}, []);
```

runs only once after the first render.

this means even if useOnScreenHook is rendered 5 times, the useEffect was only run once
---

## 4. JSX is rendered

React renders 100 divs.

For every div:

```jsx
ref={(el) => (elementsRef.current[index] = el)}
```

is executed.

So:

```js
elementsRef.current[0] = div1;
elementsRef.current[1] = div2;
...
elementsRef.current[99] = div100;
```

Now:

```js
elementsRef.current = [
  div1,
  div2,
  ...
  div100
]
```

---

## 5. Component finishes rendering

After the DOM has been committed, React executes:

```js
useEffect(() => {
    ...
}, []);
```

inside `useOnScreenHook`.

This effect runs **once**.

---

## 6. IntersectionObserver is created

```js
const observer = new IntersectionObserver(callback);
```

Only one observer instance is created.

---

## 7. Every element is observed

```js
elementsRef.current.forEach((el) => {
    observer.observe(el);
});
```

Internally:

```js
observe(div1)
observe(div2)
...
observe(div100)
```

---

## 8. Browser watches visibility

Nothing from React runs now.

The browser continuously tracks whether observed elements are entering or leaving the viewport.

---

## 9. When an element crosses the threshold

Suppose item 10 becomes visible.

Browser calls:

```js
callback(entries)
```

with:

```js
entries = [
  {
    target: div10,
    isIntersecting: true
  }
]
```

If item 10 later leaves:

```js
callback(entries)
```

with:

```js
entries = [
  {
    target: div10,
    isIntersecting: false
  }
]
```

The callback may run many times.

---

# How many times does `useOnScreenHook()` run?

### The hook function itself

```js
useOnScreenHook(elementsRef);
```

runs on **every render**.

If Grid renders 5 times:

```
Render 1 → useOnScreenHook called
Render 2 → useOnScreenHook called
Render 3 → useOnScreenHook called
Render 4 → useOnScreenHook called
Render 5 → useOnScreenHook called
```

---

### But `useEffect(..., [])`

runs only once:

```
Render 1
↓
Commit
↓
Effect runs
↓
Observer created

Render 2
↓
Effect skipped

Render 3
↓
Effect skipped
```

---

### Observer callback

Runs whenever visibility changes:

```
div5 enters viewport
↓
callback()

div6 enters viewport
↓
callback()

div5 leaves viewport
↓
callback()

div10 enters viewport
↓
callback()
```

---

## Complete picture

```text
Grid renders
    ↓
useRef([])
    ↓
useOnScreenHook()
    ↓
100 refs assigned
    ↓
useEffect runs once
    ↓
IntersectionObserver created
    ↓
observe(div1)...observe(div100)
    ↓
Browser monitors visibility
    ↓
Visibility changes
    ↓
callback(entries) fires
```

This is the exact sequence of events.
