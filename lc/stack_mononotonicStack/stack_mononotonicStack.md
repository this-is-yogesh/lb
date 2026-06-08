

# 🥞 The Ultimate Stack & Monotonic Stack Interview Cheat Sheet

## 📌 Core Mindset: The Philosophy of Deferral

- **Standard Array vs. Stack:** In traditional single-pass iterations, decisions are made immediately as you step through the array. Stacks are used when **you cannot make a immediate decision**—you must wait to see what elements arrive down the line.
- **The Mental Model:** Defer unresolved elements by pushing them into a Last-In, First-Out (LIFO) holding pattern until future information arrives to resolve them.
- **The Monotonic Imperative:** Use a classic stack when the *most recent unresolved item* matters (e.g., nesting). Use a *monotonic stack* when each element needs to locate its immediate *next greater* or *next smaller* neighbor.

---

## 🛠️ The Core 4 Code Patterns (JavaScript)

### 1. Matching & Nested Structures (Uniform Closer Map)

> **When to use:** Evaluating brackets, parentheses, HTML tags, or nested directory structures where the most recently opened element must be the first one resolved.

```javascript
function isValidMatching(s) {
    const stack = [];
    // Map closing elements to their expected opening counterparts
    const closeToOpen = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char in closeToOpen) {
            // Guard: Closer encountered with no opener, or incorrect nesting order
            if (stack.length === 0 || stack[stack.length - 1] !== closeToOpen[char]) {
                return false;
            }
            stack.pop(); // Resolved matching pair
        } else {
            stack.push(char); // It's an opener, defer resolution
        }
    }
    
    // Valid only if all deferred elements were cleanly paired up
    return stack.length === 0;
}
```

### 2. State Tracking (`O(1)` Historical Snapshots)

> **When to use:** Designing a data structure that needs to track dynamic properties like running minimums, maximums, or sums concurrently across additions and removals without scanning the list in `O(n)`.

```javascript
class MinStack {
    constructor() {
        this.stack = []; // Stores tuples: [actual_value, current_minimum_at_this_layer]
    }

    push(val) {
        // Compute the min relative to the historical snapshot right below it
        let currentMin = val;
        if (this.stack.length > 0) {
            const previousMin = this.stack[this.stack.length - 1][1];
            currentMin = Math.min(val, previousMin);
        }
        this.stack.push([val, currentMin]);
    }

    pop() {
        this.stack.pop(); // Automatic history reversion; previous state is now top
    }

    top() {
        return this.stack[this.stack.length - 1][0];
    }

    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}
```

### 3. Monotonic Decreasing Stack (Finds Next Greater Element)

> **When to use:** Elements are placed sequentially into a stack that enforces strict decreasing order from bottom to top. As soon as a newly arrived element breaks this pattern, the elements on the stack have officially discovered their "next greater element."

```javascript
function nextGreaterElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = []; // ALWAYS store indices, not literal values
    
    for (let i = 0; i < n; i++) {
        // If current element is larger than the index value at the top, pop it!
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = nums[i]; // Resolved its next greater element
        }
        stack.push(i); // Defer current index
    }
    return result;
}
```

### 4. Monotonic Increasing Stack (Finds Next Smaller Element)

> **When to use:** Elements enforce an increasing trend from bottom to top. A newly arrived smaller value breaks the structure, causing older values to pop because they found their "next smaller element."

```javascript
function nextSmallerElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    for (let i = 0; i < n; i++) {
        // Trigger resolution loop when current element is strictly smaller than top
        while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = nums[i]; // Resolved its next smaller element
        }
        stack.push(i);
    }
    return result;
}
```

---

## 🚀 Advanced Composite: Largest Rectangle in Histogram

> **The Insight:** The maximal rectangle for any given column bar relies on identifying where its boundaries collapse. The boundary collapses when it encounters its **Previous Smaller** index (left limit) and **Next Smaller** index (right limit). An increasing stack tracks both concurrently.

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    // Sentinel Trick: Append 0 at the end to guarantee every single 
    // remaining unpopped element gets flushed and calculated before completion
    const modifiedHeights = [...heights, 0];
    
    for (let i = 0; i < modifiedHeights.length; i++) {
        while (stack.length > 0 && modifiedHeights[i] < modifiedHeights[stack[stack.length - 1]]) {
            const h = modifiedHeights[stack.pop()];
            
            // Width Calculation:
            // If stack is empty, this bar was the smallest seen so far; width stretches all the way to index i.
            // Otherwise, its boundary is defined by the new item at the top of the stack.
            const w = (stack.length === 0) ? i : i - stack[stack.length - 1] - 1;
            
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    
    return maxArea;
}
```

---

## 🗺️ Monotonic Direction Cheat Matrix

| Objective | Stack Type (Bottom → Top) | Pop Trigger Condition | Variant Strategy |
| --- | --- | --- | --- |
| **Next Greater Element** | Monotonic Decreasing ↓ | `current > top` | Standard left-to-right processing |
| **Next Smaller Element** | Monotonic Increasing ↑ | `current < top` | Standard left-to-right processing |
| **Previous Greater Element** | Monotonic Decreasing ↓ | `current > top` | Run iteration **right-to-left** |
| **Previous Smaller Element** | Monotonic Increasing ↑ | `current < top` | Run iteration **right-to-left** |
| **Circular Array Variants** | Monotonic Decreasing ↓ | `current > top` | Fake loop expansion: Loop up to `2n - 1`, look up elements via `i % n` |

---

## 🛠️ Design Choice: What Should the Stack Store?

Choosing between raw values or index markers is where engineers lose time under pressure. Follow this absolute taxonomy:

- **Store Indices:** Whenever your logic requires calculating physical distance, relative tracking positions, or coordinate space bounds (e.g., *Daily Temperatures*, *Largest Rectangle in Histogram*, *Stock Span*).

> 💡 **Pro-Tip:** Storing indices is inherently safe because you can always fetch the structural value instantly via `arr[stack[stack.length - 1]]`.

- **Store Raw Values/Tuples:** Only when positions are completely irrelevant to the output and you exclusively need historical state evaluations (e.g., *Valid Parentheses*, *Min Stack*, *Reverse Polish Notation Evaluation*).

---

## ⚠️ Top 5 Stack Interview Traps & Guardrails

### 1. The Empty Stack Peek Crash

Running a condition check like:

```javascript
while (nums[i] > nums[stack[stack.length - 1]])
```

without verified contents on the stack.

- *Fix:* Prepend the block check safely with your length validation:

```javascript
while (stack.length > 0 && ...)
```

### 2. The "Leftover" Amnesia Trap

Running a loop across an input, but forgetting that some columns/elements never encounter their resolution trigger, leaving them abandoned on the stack at exit.

- *Fix:* Use the **Sentinel Trick**—append a value (`0` for next smaller problems, or `Infinity` for next greater problems) at the end of your collection to clear the stack out manually.

### 3. The False Quadratic Time Warning

Panic over nested loops (`while` inside a `for`), incorrectly identifying it as `O(n²)`.

- *Fix:* Ground yourself in aggregate analysis—every element is individualistically pushed onto the stack exactly once and popped off at most once. The execution is firmly bounded to **`O(n)` Time**.

### 4. The Value/Index Collision

Attempting to do distance metrics (like `i - stack.pop()`) but accidentally storing elements instead of index points.

- *Fix:* Standardize your coding rhythm to default entirely to index storage for Monotonic Stack puzzles.

### 5. The Bad Monotonic Vector Mapping

Confusing increasing structure configurations with the type of neighbor it identifies.

- *Fix:* Remember the Inverse Rule: A **decreasing** stack finds the next **greater** element; an **increasing** stack maps the next **smaller** element.
````
