

# 🚀 The Ultimate Linked List Interview Cheat Sheet

## 📌 Core Mindset & Reality Check

- **The Constraint:** Arrays allow `O(1)` random access via indices. Linked lists only allow sequential access (moving one node at a time via `.next`).
- **The Real Challenge:** Linked list problems are rarely about complex algorithmic logic. They are about **pointer manipulation**—rewiring references without dropping nodes into memory-loss oblivion.
- **The Golden Rule:** Always **Save before you Rewire**.

---

## 🛠️ The Big 4 Code Patterns (JavaScript)

### 1. The Dummy Node Pattern

> **When to use:** Whenever the `head` node of the list might change (e.g., deletions, insertions at the beginning, or merging). It completely eliminates messy edge-case logic for the head.

```javascript
// Basic Node Definition
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Example: Removing all nodes matching a specific value
function removeElements(head, val) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    while (current.next !== null) {
        if (current.next.val === val) {
            current.next = current.next.next; // Skip the node
        } else {
            current = current.next; // Move forward
        }
    }
    return dummy.next; // The true, updated head
}
```

### 2. Fast & Slow Pointers (Tortoise & Hare)

> **When to use:** Finding the middle of a list, detecting cycles, or finding a position relative to the end without knowing total length.

```javascript
// Pattern A: Find the Middle Node
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    // For even lengths, this returns the second middle node
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Pattern B: Cycle Detection (Floyd's Algorithm)
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true; // Cycle detected!
        }
    }
    return false;
}
```

### 3. In-Place Reversal Pattern

> **When to use:** Changing the direction of pointers so the list runs backward. This "three-variable dance" is a building block for dozens of medium/hard problems.

```javascript
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let nextNode = current.next; // 1. Save the remaining list
        current.next = prev;         // 2. Rewire pointer backward
        prev = current;              // 3. Move prev step forward
        current = nextNode;          // 4. Move current step forward
    }
    return prev; // 'prev' is now the new head
}
```

### 4. Merge Pattern

> **When to use:** Combining two sorted lists into one unified sorted list by splicing existing nodes in-place.

```javascript
function mergeTwoLists(list1, list2) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Wire up whichever list has remaining elements
    current.next = (list1 !== null) ? list1 : list2;
    
    return dummy.next;
}
```

### Bonus: Two-Pointer Gap Technique

> **When to use:** Removing or finding the `n`-th node from the end of a list in a single pass.

```javascript
function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;
    
    // Advance fast pointer n + 1 steps to create the correct gap
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast hits the end
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // slow is now right BEFORE the node to remove
    slow.next = slow.next.next;
    
    return dummy.next;
}
```

---

## 🗺️ Problem Deconstruction Matrix

Most Medium and Hard interview questions are just **two or three of these patterns wearing a trench coat**.

| Problem | Pattern Breakdown | Complexity |
| --- | --- | --- |
| **Palindrome Linked List** | 1. **Fast/Slow** to find middle<br><br>2. **Reverse** second half<br><br>3. Compare first and second halves | Time: `O(n)`<br><br>Space: `O(1)` |
| **Reorder List** | 1. **Fast/Slow** to find middle<br><br>2. **Reverse** second half<br><br>3. **Merge** lists by alternating nodes | Time: `O(n)`<br><br>Space: `O(1)` |
| **Add Two Numbers** | 1. **Merge/Simultaneous Walk** to process elements<br><br>2. **Dummy Node** to construct the brand new sum list | Time: `O(max(n, m))`<br><br>Space: `O(max(n, m))` |
| **Linked List Cycle II** | 1. **Fast/Slow** to find meeting point inside cycle<br><br>2. Pointer from head + pointer from meeting point move at `1×` to find cycle start | Time: `O(n)`<br><br>Space: `O(1)` |

---

## ⚠️ Top 5 Interview Traps & How to Avoid Them

### 1. The Ghost Reference Bug

Changing `current.next` before caching where the next node actually was.

- *Fix:* Always declare a temporary `let nextNode = current.next` before rewiring.

### 2. The "Head-Change" Amnesia

Forgetting to handle situations where the original head is deleted or replaced.

- *Fix:* If the head can alter, instantiate a `dummy` node immediately. No extra credit is given for avoiding them, but points are always deducted for head bugs.

### 3. The Array "Cheater" Penalty

Copying list values into a standard array, altering the array, and building a list from scratch.

- *Fix:* This forces an unnecessary `O(n)` space complexity. Treat this as a last resort; interviewers specifically test your in-place pointer skills.

### 4. The Short-Circuit Crash

Writing:

```javascript
while (fast.next !== null && fast !== null)
```

which crashes if `fast` is null.

- *Fix:* Order matters due to short-circuit evaluation. Always check the parent object first:

```javascript
while (fast !== null && fast.next !== null)
```

### 5. The Old Head Return

Accidentally returning the original `head` variable after running a list reversal loop.

- *Fix:* Remember that after a full reversal, the old `head` is now the *tail* pointing to `null`. The new head is always `prev`.

---

## ⏱️ Quick Architecture Reference

> 💡 **Pro-Tip:** Every standard in-place pattern operates in **`O(n)` Time** and **`O(1)` Space**. If your solution utilizes higher space configurations, look for an in-place pointer optimization.

- **Going to Tree Structures next?** A linked list node is simply a tree node with a single pointer (`next`). Trees extend this concept to two pointers (`left` and `right`), changing your loop-driven iterations into recursive tree traversals.
````
