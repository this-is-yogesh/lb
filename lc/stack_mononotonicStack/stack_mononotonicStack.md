Here is your ultimate **Stack & Monotonic Stack** cheat sheet, written in an easy-to-understand format and fully translated into **JavaScript**.

---

## 1. Core Templates (Pick One & Stick to It)

A stack is a **LIFO** (Last In, First Out) data structure. In JavaScript, use an ordinary array with `.push()` and `.pop()`. To peek at the top, use `stack[stack.length - 1]`.

### Pattern A: Matching & Nesting (e.g., Valid Parentheses)

Use this when items must close in the exact reverse order they opened.

* **Rule:** If it's an opener, push it. If it's a closer, it *must* match the top of the stack.

```javascript
function isValidMatching(s) {
    const stack = [];
    const closeToOpen = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        // If it's a closing bracket
        if (char in closeToOpen) {
            // Guard against empty stack OR mismatch
            if (stack.length === 0 || stack[stack.length - 1] !== closeToOpen[char]) {
                return false;
            }
            stack.pop(); // Resolved a pair
        } else {
            stack.push(char); // It's an opening bracket
        }
    }
    return stack.length === 0; // Everything must be resolved
}

```

### Pattern B: State Tracking (e.g., Min Stack)

Use this when you need an aggregate value (like the minimum) across history in $O(1)$ time.

* **The Insight:** Do not use a single global variable. Store a snapshot of the state **as an object/tuple alongside each element**.

```javascript
class MinStack {
    constructor() {
        this.stack = []; // Stores objects: { val: X, min: Y }
    }

    push(val) {
        let currentMin = val;
        if (this.stack.length > 0) {
            const topMin = this.stack[this.stack.length - 1].min;
            currentMin = Math.min(val, topMin);
        }
        this.stack.push({ val: val, min: currentMin });
    }

    pop() {
        this.stack.pop();
    }

    top() {
        return this.stack[this.stack.length - 1].val;
    }

    getMin() {
        return this.stack[this.stack.length - 1].min;
    }
}

```

---

## 2. Advanced Monotonic Stack Frameworks

Use a monotonic stack when elements are "waiting for an answer" from future elements.

* **Crucial Rule:** Always default to **storing indices** instead of values. Indices allow you to calculate both distances (`i - prevIndex`) and look up values (`nums[i]`).

### Monotonic Decreasing (Finds Next Greater Element)

* **The Rule:** The stack values must look like a descending staircase. Pop when the incoming element is **strictly greater** than the top element.

```javascript
function nextGreaterElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = []; // Stores indices

    for (let i = 0; i < n; i++) {
        // While stack is not empty AND current value is greater than stack top value
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop(); // Popped element found its answer!
            result[prevIndex] = nums[i];   // Record the answer
        }
        stack.push(i);
    }
    return result;
}

```

> **For Daily Temperatures:** Instead of saving `nums[i]` into the result, save the index difference: `result[prevIndex] = i - prevIndex;`

### Monotonic Increasing (Finds Next Smaller Element)

* **The Rule:** The stack values must look like an ascending staircase. Pop when the incoming element is **strictly smaller** than the top element.

```javascript
function nextSmallerElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

```

---

## 3. The Interview Boss Level: Largest Rectangle in Histogram

This problem uses an **increasing stack** because a rectangle's boundary is limited by the *previous smaller* and *next smaller* bars.

* **The Sentinel Trick:** Push a `0` at the very end of the array to force any remaining elements on the stack to flush out and compute their final areas.

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    // Append a sentinel 0 to clear out the stack at the end
    heights.push(0); 

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()]; // The height of the rectangle
            
            // Width is the gap between next smaller (i) and previous smaller (stack top)
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    
    heights.pop(); // Restore original array state
    return maxArea;
}

```

---

## 4. Pattern Recognition Cheat Sheet

| Keyword Signal | Matching Pattern | Example LeetCode Problem |
| --- | --- | --- |
| "Balanced tags", "Valid matching brackets", "Nested structures" | **Matching Template (LIFO)** | *LC 20: Valid Parentheses* |
| "Find maximum/minimum over time in $O(1)$ operations" | **State Tracking Template** | *LC 155: Min Stack* |
| "Next warmer day", "First element to the right greater than..." | **Monotonic Decreasing Stack** | *LC 739: Daily Temperatures* |
| "Next smaller element", "Span of stock prices falling down" | **Monotonic Increasing Stack** | *LC 901: Online Stock Span* |
| "Circular array / wraps around" | **Run standard loop twice** | *LC 503: Next Greater Element II* |
| "Boundaries of area", "Trapping water", "Max histogram area" | **Increasing Monotonic Stack** | *LC 84: Largest Rectangle* |

---

## 5. Master Anti-Bug Checklist

* [ ] **Empty Stack Guards:** Never evaluate `stack[stack.length - 1]` without checking if `stack.length > 0` first. Doing so causes runtime errors.
* [ ] **Value vs Index:** Always default to storing **indices** in monotonic stack problems. If you store values, you completely lose track of distances.
* [ ] **Circular Loop Trick:** If the problem loops around to index 0 at the end, change your loop boundary to `i < 2 * n` and look up elements using `nums[i % n]`.
* [ ] **The Remaining Items:** Remember that elements remaining on the stack at the end of the loop mean they *never* found an answer. If your default value array isn't pre-filled correctly (like `-1` or `0`), handle them after the loop or use a `0` sentinel value.