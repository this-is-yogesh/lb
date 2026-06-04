Here is your ultimate Binary Search cheat sheet, optimized for quick reference and fully translated into **JavaScript**.

---

## 1. Core Templates (Pick One & Stick to It)

Mixing conventions is the #1 cause of infinite loops. Choose your template based on your goal:

### Template A: Exact Match (Target Search)

Use this when you are looking for a specific value in a sorted array and want to return as soon as you find it.

* **Loop condition:** `while (left <= right)`
* **Updates:** `left = mid + 1` and `right = mid - 1`

```javascript
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // Math.floor prevents decimal results; subtraction form avoids integer overflow
        let mid = left + Math.floor((right - left) / 2); 
        
        if (nums[mid] === target) {
            return mid; // Found early
        } else if (nums[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

```

### Template B: Boundary Search (Lower / Upper Bounds)

Use this when searching for a **transition point** or insertion index (e.g., finding the *first* element $\ge$ target).

* **Loop condition:** `while (left < right)` (stops exactly when `left === right`)
* **Updates:** `left = mid + 1` and `right = mid`

sample input = [1,2,4,4,4,7]
lower bound target = 4,meaning first element which is <= 4 then  index 2 nums 4
upper bound target = 4, meaning first element which is > than 4 which is index 5 and nums 7
```javascript
function lowerBound(nums, target) {
    let left = 0;
    let right = nums.length; // Note: Starts at nums.length, not length - 1

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] < target) {
            left = mid + 1; // mid is too small; exclude it
        } else {
            right = mid;    // mid could be the answer; keep it in range
        }
    }
    return left; // left is the exact boundary point
}

```

> **Quick Mod:** For **Upper Bound** (first element strictly $>$ target), just change the condition to: `if (nums[mid] <= target)`.

---

## 2. Advanced Frameworks

### Binary Search on Answer Space

Use this when the problem asks for a **minimum or maximum valid value** instead of searching an array.

#### The 3-Step Strategy

1. **Define Search Space:** Set `lo` to the minimum possible answer and `hi` to the maximum possible answer.
2. **Write a Feasibility Check (`feasible`):** Create a helper function that returns `true` or `false` for a candidate value using a greedy strategy or simulation.
3. **Verify Monotonicity:** Ensure the problem acts like a switch (e.g., `false, false, false, true, true`). Ask: *"If speed/capacity $X$ works, will $X + 1$ definitely work?"*

sample input:
 piles = [3,6,7,11]
h = 8
min speed to eat bananas so that koko finishes all the piles within h hours
```javascript
function binarySearchOnAnswer(minPossible, maxPossible) {
    let lo = minPossible;
    let hi = maxPossible;

    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (feasible(mid)) {  
            hi = mid;       // Try to find an even smaller valid answer
        } else {
            lo = mid + 1;   // mid is invalid/too small; look higher
        }
    }
    return lo; // Returns the smallest valid answer
}

// Example placeholder for the feasibility check
function feasible(candidate) {
    // Problem-specific simulation logic logic here
    return true; 
}

```

### Rotated Sorted Arrays (Split-Half Trick)

* **The Insight:** If you cut a rotated sorted array in half, **at least one side is always normally sorted**.
* **The Check:** If `nums[left] <= nums[mid]`, the **left half** is sorted. Otherwise, the **right half** is sorted.
* **The Move:** Figure out which side is sorted, check if your `target` falls inside its range. If it does, narrow down to that side. If not, jump to the other side.

```javascript
function searchRotated(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Target is in the sorted left half
            } else {
                left = mid + 1;  // Target is in the right half
            }
        } 
        // Otherwise, right half must be sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;  // Target is in the sorted right half
            } else {
                right = mid - 1; // Target is in the left half
            }
        }
    }
    return -1;
}

```

---

## 3. Pattern Recognition Cheat Sheet

| Keyword Signal | Matching Pattern | Example LeetCode Problem |
| --- | --- | --- |
| "Sorted array", "Find index of..." | **Template A (Exact Match)** | *LC 704: Binary Search* |
| "Sorted array with duplicates", "First/Last position" | **Template B (Bounds)** | *LC 34: First & Last Position* |
| "Rotated", "Pivoted", "Sorted array shifted" | **Rotated Array Logic** | *LC 33: Search in Rotated Array* |
| *"Find the minimum $X$ to satisfy a condition"* | **Search on Answer Space** | *LC 875: Koko Eating Bananas* |
| *"Maximize the minimum distance / Allocate resources"* | **Search on Answer Space** | *LC 1011: Capacity to Ship Packages* |

---

## 4. Master Anti-Bug Checklist

* [ ] **Integer Math:** In JavaScript, `/` results in floats. Always wrap your mid calculation in `Math.floor()`.
* [ ] **Overflow Habit:** Write `left + Math.floor((right - left) / 2)` instead of `Math.floor((left + right) / 2)`.
* [ ] **Infinite Loop Guard:** If using `while (left <= right)`, you *must* use `mid + 1` and `mid - 1`. If using `while (left < right)`, use `mid + 1` and `mid`.
* [ ] **Finding Minimums:** When looking for a rotation point or minimum element, always compare `nums[mid]` against `nums[right]` (comparing against `left` breaks if the array isn't actually rotated).
* [ ] **Smart Bounds (`lo` / `hi`):** For Answer Space problems, don't set your upper bound to an arbitrary giant number.
* *Example:* If loading packages, `lo` is `Math.max(...weights)` (you can't break a package in half) and `hi` is the `sum` of all weights (shipping everything in 1 day).