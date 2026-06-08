
# 🎯 The Ultimate Binary Search Interview Cheat Sheet

## 📌 Core Mindset & The Monotonic Rule

- **Beyond the Array:** Binary search is not just for finding an element in a sorted array. It applies to **any problem with a monotonic structure** where a yes/no condition flips exactly once across an ordered range.
- **The Core Goal:** Find the exact boundary/flip point in `O(log n)` by discarding half of the remaining possibilities with a single check.
- **The Framework:**

```text
Search Space Range: [lo .......... answer .......... hi]
```

```text
Feasibility Check: [False, False, False, True, True, True, True]
```

---

## 🛠️ The Bug-Free Templates (JavaScript)

### 1. Standard Binary Search (Find Exact Target)

> **When to use:** Finding an exact element in a strictly sorted array. Uses inclusive bounds (`left <= right`) and narrows down by moving both pointers past `mid`.

```javascript
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        // Safe mid calculation to avoid potential integer overflow
        let mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1; // Discard left half
        } else {
            right = mid - 1; // Discard right half
        }
    }
    return -1; // Target not found
}
```

### 2. Lower Bound & Upper Bound (Bisect Left / Right)

> **When to use:** Finding insertion points, first/last occurrences, or handling duplicates. Uses strict less-than (`left < right`) and converges to a single point where `left === right`.

```javascript
// Lower Bound: First element that is >= target
function lowerBound(nums, target) {
    let left = 0;
    let right = nums.length; // Range is inclusive-exclusive [left, right)
    
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid; // Trim right space, keeping mid as a candidate
        }
    }
    return left;
}

// Upper Bound: First element that is STRICTLY > target
function upperBound(nums, target) {
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```

### 3. Search in Rotated Sorted Array

> **When to use:** An array sorted in ascending order is rotated at an unknown pivot point. The key trick: **At least one half of the array is always normally sorted.**

```javascript
function searchRotated(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        
        // Step 1: Determine which half is normally sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Target is inside sorted left half
            } else {
                left = mid + 1;  // Target is in the right half
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;  // Target is inside sorted right half
            } else {
                right = mid - 1; // Target is in the left half
            }
        }
    }
    return -1;
}
```

### 4. Find Minimum in Rotated Sorted Array

> **When to use:** Finding the pivot point or the smallest element in a rotated array. Compare `mid` against `right` to safely handle non-rotated arrays.

```javascript
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        // Compare with right pointer, never the left pointer
        if (nums[mid] > nums[right]) {
            left = mid + 1; // Minimum must be to the right of mid
        } else {
            right = mid;    // mid could be the minimum itself
        }
    }
    return nums[left];
}
```

---

## 🚀 Binary Search on Answer Space (The Advanced Meta)

> **The Pattern:** You aren't searching a physical array. You are searching for the **smallest or largest possible value** that satisfies a complex restriction.

### The 3-Step Framework

1. **Define Search Space:** Establish the absolute minimum (`lo`) and maximum (`hi`) possible answers.
2. **Write the Feasibility Helper:** Create a function `feasible(candidate)` that takes a value and returns `true` or `false` in `O(n)` time.
3. **Verify Monotonicity:** Ask: *"If candidate X works, will X + 1 (or X - 1) definitely work?"*

```javascript
// Generic template to find the MINIMUM valid answer matching a constraint
function binarySearchOnAnswer(inputs, limits) {
    let lo = getMinPossibleAnswer(inputs);
    let hi = getMaxPossibleAnswer(inputs);
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (feasible(inputs, mid, limits)) {
            hi = mid; // Try to find a smaller working answer
        } else {
            lo = mid + 1; // Current answer too small, push upward
        }
    }
    return lo;
}
```

---

## 🗺️ Classical "Search on Answer" Implementations

### A. Koko Eating Bananas (LeetCode 875)

- **Search Space:** `lo = 1` (slowest speed), `hi = Math.max(...piles)` (fastest meaningful speed).

```javascript
function minEatingSpeed(piles, h) {
    let lo = 1;
    let hi = Math.max(...piles);
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (canEatAll(piles, mid, h)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

function canEatAll(piles, speed, hoursLimit) {
    let hoursSpent = 0;
    for (let pile of piles) {
        // Math.ceil(pile / speed) via integer arithmetic
        hoursSpent += Math.ceil(pile / speed);
    }
    return hoursSpent <= hoursLimit;
}
```

### B. Capacity to Ship Packages Within D Days (LeetCode 1011)

- **Search Space:** `lo = Math.max(...weights)` (must fit the single heaviest package), `hi = sum(weights)` (shipping everything on Day 1).

```javascript
function shipWithinDays(weights, days) {
    let lo = Math.max(...weights);
    let hi = weights.reduce((a, b) => a + b, 0);
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (canShipWithCapacity(weights, mid, days)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

function canShipWithCapacity(weights, capacity, maxDays) {
    let daysNeeded = 1;
    let currentLoad = 0;
    
    for (let w of weights) {
        if (currentLoad + w > capacity) {
            daysNeeded += 1;
            currentLoad = 0;
        }
        currentLoad += w;
    }
    return daysNeeded <= maxDays;
}
```

---

## ⚠️ Top 5 Binary Search Traps & Bug Mitigations

### 1. The Infinite Loop Trap (`left = mid`)

Using `left = mid` in a standard `while (left <= right)` loop will freeze execution when `left` and `right` differ by 1.

- *Fix:* Stick strictly to the combinations matching your templates. Match `while (left <= right)` with `mid + 1` / `mid - 1`. Match `while (left < right)` with `right = mid`.

### 2. The Ambiguous Minimum Comparison

Comparing `nums[mid]` with `nums[left]` when searching for a minimum in a rotated sorted array. This fails when the array is already perfectly sorted.

- *Fix:* Always compare against `nums[right]`.

### 3. The Strict Inequality Rotation Bug

Writing `if (nums[left] < nums[mid])` instead of `<=`. When a subarray length reduces to 2, `left === mid`. The strict evaluation breaks down on single-element boundaries.

- *Fix:* Always use `nums[left] <= nums[mid]`.

### 4. The Inflated Answer Range

Setting the `hi` boundary of an answer space unnecessarily high (like `Number.MAX_VALUE` or `sum(piles)` instead of `max(piles)`).

- *Fix:* Tighten your bounds logically before writing the algorithm. It shows deep optimization comprehension during code reviews.

### 5. The Missing Complexities Definition

Forgetting that "Search on Answer" problems execute the helper function at every single step.

- *Fix:* The total run time is **not** `O(log m)`. It is `O(n log m)`, where `n` is the array length inspected inside the feasibility function, and `m` is the range size of your answer space.
````
