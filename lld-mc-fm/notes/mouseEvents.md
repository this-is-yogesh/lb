## Mouse Events

### mousedown
Fires when a mouse button is pressed : 
Cursor at x = 250,mousedown occurs,e.clientX = 250

### mousemove
Fires whenever the mouse moves:
window.addEventListener("mousemove", handleMouseMove);
Cursor moves:100 → 101 → 102 → 103, mousemove fires for each movement,Each event contains the current cursor position:


### mouseup
Fires when the mouse button is released,window.addEventListener("mouseup", handleMouseUp); Pressed at x = 250 , Dragged to x = 500
Released, e.clientX = 500

---

## Touch Events (Mobile Equivalent)

| Desktop | Mobile |
|----------|----------|
| mousedown | touchstart |
| mousemove | touchmove |
| mouseup | touchend |

### touchstart
Finger touches the screen.

### touchmove
Finger moves on the screen.
window.addEventListener("touchmove", handleTouchMove);

### touchend
Finger leaves the screen.
window.addEventListener("touchend", handleTouchEnd);

## Why touch events use e.touches[0].clientX ?
because in mouse There is only one cursor.
but in touch, Multiple fingers can exist simultaneously like [
  { clientX: 100 },
  { clientX: 300 }
] so we take first finger e.touches[0].clientX


# Understanding e.clientX

## What is e.clientX ?
It is the horizontal position of the cursor relative to the browser viewport.

Example:
Browser Window
0 ------------------------------------->

Cursor at x = 350px then e.clientX = 350
e.clientX is NOT relative to your component,It is relative to the browser window.

# Why do we use getBoundingClientRect() ?
const rect = containerRef.current.getBoundingClientRect();
Example:

Container starts at x = 200px
Container width = 500px
Mouse is at x = 350px


Need to know:How far inside the container is the mouse?


Calculation: const localX = e.clientX - rect.left;
350 - 200 = 150;

Now we know:
Mouse is 150px inside the container


# Why do we calculate percentage?

Code:

```js
let position =
  ((clientX - rect.left) / rect.width) * 100;
```

Let's break it down.

Example:
Mouse is 150px inside container.
Step 2:
150 / 500 = 0.3 
0.3 * 100 = 30%
Mouse is 30% across the container.



Why percentage instead of pixels?

Bad:150px
If container width changes,500px → 1000px,150px no longer represents the same location.
Good: 30%
Works for all screen sizes, is Responsive.

# Why do we Clamp Values?

Code:
```js
position = Math.max(
  0,
  Math.min(position, 100)
);
```

Purpose:
Prevent slider from going outside the container.

---

Without clamping
Mouse moves left outside container:position = -20%
Mouse moves far right:position = 140%
This can break the UI.

---

With clamping
Anything below 0 → 0
Anything above 100 → 100

---

# Main Takeaway

Most draggable UI components follow the same pattern:

```txt
User Input
      ↓
Mouse/Finger Position
      ↓
Convert to Local Coordinates
      ↓
Convert to Meaningful Value
(%, volume, time, rating, etc.)
      ↓
Clamp Valid Range
      ↓
Update State
      ↓
Re-render UI
```

Examples:

- Image Comparison Slider
- Range Slider
- Volume Control
- Video Timeline
- Audio Scrubber
- Star Rating
- Drag & Drop
- Resizable Sidebar
- Image Cropper
- Custom Scrollbar