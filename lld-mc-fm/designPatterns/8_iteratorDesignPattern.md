# Iterator Design Pattern in JavaScript

## What is Iterator Pattern?

The **Iterator Pattern** is a behavioral design pattern that provides a way to access elements of a collection **one at a time without exposing its internal structure**.

Instead of manually managing indexes and loops, we ask the iterator for the next element whenever we need it.

---

## Definition

> **Iterator Pattern provides a standard way to sequentially access elements of a collection without exposing how the collection is implemented internally.**

---

# Why Do We Need Iterator Pattern?

Suppose we have:

* Arrays
* Sets
* Maps
* Trees
* Graphs
* Linked Lists

Each data structure stores data differently.

Without Iterator Pattern:

```text
Array → for loop
Set → for...of
Map → entries()
Tree → custom traversal
Linked List → next pointers
```

Every structure requires different logic.

Iterator Pattern provides a common interface:

```js
iterator.next()
```

regardless of the underlying data structure.

---

# Real-World Analogy

Think about watching songs on Spotify.

You don't need to know:

* How songs are stored.
* Whether they are in arrays or databases.

You only care about:

```text
Current Song
      ↓
Next Song
      ↓
Next Song
      ↓
Next Song
```

Similarly:

```text
Collection
      ↓
Iterator
      ↓
next()
      ↓
next()
      ↓
next()
```

---

# Basic Idea

Suppose:

```js
const arr = [1,2,3];
```

Instead of:

```js
for(let i=0;i<arr.length;i++){
}
```

we want:

```js
iterator.next();
```

Output:

```js
{
  value: 1,
  done: false
}
```

---

# What is an Iterator?

An iterator is an object having a method:

```js
next()
```

that returns:

```js
{
  value,
  done
}
```

---

### value

Current element.

---

### done

Indicates whether iteration has finished.

---

Example:

```js
{
  value: 10,
  done: false
}
```

---

After completion:

```js
{
  value: undefined,
  done: true
}
```

---

# Implementing Iterator Using Closure

```js
function createIterator(collection) {

  let i = 0;

  return {

    next() {

      if (i < collection.length) {

        return {

          value: collection[i++],

          done: false

        };

      }

      return {

        value: null,

        done: true

      };

    }

  };

}
```

---

Create iterator:

```js
const arr = [1,2,3];

const iterator =
  createIterator(arr);
```

---

Call:

```js
console.log(
  iterator.next()
);
```

Output:

```js
{
  value:1,
  done:false
}
```

---

Second call:

```js
iterator.next()
```

Output:

```js
{
  value:2,
  done:false
}
```

---

Eventually:

```js
{
  value:null,
  done:true
}
```

---

# Flow of Execution

Suppose:

```js
iterator.next();
```

Flow:

```text
Collection
     ↓
Current Index = 0
     ↓
Return element
     ↓
Increase index
     ↓
Wait for next call
```

---

Visual:

```text
[1,2,3]

Current pointer
      ↓
1 2 3

next()
 ↓

Current pointer
        ↓
1 2 3
```

---

# Complete Example

```js
function createIterator(collection) {

  let i = 0;

  return {

    next() {

      if (i < collection.length) {

        return {

          value: collection[i++],

          done: false

        };

      }

      return {

        value: null,

        done: true

      };

    }

  };

}

const iterator =
  createIterator([1,2,3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{value:1,done:false}
{value:2,done:false}
{value:3,done:false}
{value:null,done:true}
```

---

# Why is Iterator Useful?

It hides internal implementation.

For example:

```text
Tree
 ↓
Iterator
 ↓
next()
```

User doesn't need to know:

* DFS traversal
* BFS traversal

They simply use:

```js
next()
```

---

# Generator Functions (ES6)

Generator functions make iterator creation much easier.

```js
function* Gen() {

  yield "a";

  yield "b";

  yield "c";

}
```

Create:

```js
const g = Gen();
```

---

Call:

```js
g.next()
```

Output:

```js
{
  value:"a",
  done:false
}
```

---

Second:

```js
g.next()
```

Output:

```js
{
  value:"b",
  done:false
}
```

---

Last:

```js
g.next()
```

Output:

```js
{
  value:"c",
  done:false
}
```

---

After completion:

```js
g.next()
```

Output:

```js
{
  value:undefined,
  done:true
}
```

---

# Visual Representation

```text
Generator
    ↓
yield "a"
    ↓
yield "b"
    ↓
yield "c"
    ↓
Done
```

---

# Symbol.iterator

Every iterable object implements:

```js
Symbol.iterator
```

---

Example

```js
const obj = {};

obj[Symbol.iterator] =
function* () {

  yield 1;

  yield 2;

  yield 3;

};
```

---

Spread operator works:

```js
console.log(
  [...obj]
);
```

Output:

```js
[1,2,3]
```

---

# for...of Uses Iterator Internally

```js
const arr = [1,2,3];

for(const item of arr){

  console.log(item);

}
```

Internally:

```text
arr[Symbol.iterator]()
      ↓
next()
      ↓
next()
      ↓
next()
```

---

# Built-in Iterables

These already implement iterators.

### Arrays

```js
[1,2,3]
```

---

### Strings

```js
"hello"
```

---

### Maps

```js
new Map()
```

---

### Sets

```js
new Set()
```

---

### Typed Arrays

```js
Uint8Array
```

---

Objects are NOT iterable:

```js
{}
```

This fails:

```js
[...{}]
```

because objects don't implement:

```js
Symbol.iterator
```

---

# Single-use Iterators

Generator iterators are consumed once.

```js
function* createIterator(){

  yield 1;

  yield 2;

}
```

```js
const iterator =
  createIterator();
```

Loop:

```js
for(const item of iterator){

  console.log(item);

}
```

Output:

```text
1
2
```

Second loop:

```js
for(const item of iterator){

}
```

Nothing happens.

Because generator state has been exhausted.

---

# Multi-use Iterables

```js
const customIterable = {

  *[Symbol.iterator]() {

    yield 1;

    yield 2;

    yield 3;

  }

};
```

Loop:

```js
for(const item of customIterable){

  console.log(item);

}
```

Output:

```text
1
2
3
```

Again:

```js
for(const item of customIterable){

  console.log(item);

}
```

Output:

```text
1
2
3
```

A fresh iterator is created every time.

---

# Passing Values into next()

Generators can receive values.

```js
function* Counter() {

  let x = yield 1;

  console.log(x);

}
```

```js
const g = Counter();

g.next();
```

Output:

```js
{
 value:1,
 done:false
}
```

Now:

```js
g.next(100);
```

prints:

```text
100
```

---

# Round Robin Example

```js
function* RoundRobin(collection) {

  let current = 0;

  while(true){

    const reset =
      yield collection[
        current++
        % collection.length
      ];

    if(reset){

      current = 0;

    }

  }

}
```

Create:

```js
const rr =
  RoundRobin([1,2,3,4]);
```

Output:

```js
rr.next()
//1

rr.next()
//2

rr.next()
//3
```

Reset:

```js
rr.next(true)
```

Output:

```js
1
```

---

Flow:

```text
1
↓
2
↓
3
↓
reset
↓
1
↓
2
↓
3
↓
4
↓
1
```

---

# Example 1: Playlist Iterator

```js
function* playlist() {

  yield "Song A";

  yield "Song B";

  yield "Song C";

}
```

---

Usage:

```js
const songs =
  playlist();

songs.next();
songs.next();
songs.next();
```

---

# Example 2: Infinite Counter

```js
function* counter() {

  let i = 1;

  while(true){

    yield i++;

  }

}
```

Output:

```text
1
2
3
4
...
```

---

# Example 3: Pagination

```text
Page1
 ↓
Page2
 ↓
Page3
```

Iterator fetches next page when required.

---

# Example 4: Tree Traversal

```text
      A
    /   \
   B     C
```

Iterator can traverse:

### DFS

```text
A
B
C
```

or

### BFS

```text
A
B
C
```

using the same interface:

```js
next()
```

---

# Example 5: Database Cursor

MongoDB cursors behave like iterators.

```js
cursor.next()
```

returns the next document.

---

# Real Examples Around Us

### Arrays

```js
arr.values()
```

---

### Strings

```js
for(const ch of str)
```

---

### Maps

```js
map.entries()
```

---

### Sets

```js
set.values()
```

---

### Generators

```js
yield
```

---

### MongoDB Cursor

```js
cursor.next()
```

---

### Node Streams

Data is consumed chunk by chunk.

---

# Advantages

### Uniform Interface

All collections expose:

```js
next()
```

---

### Lazy Evaluation

Values are generated only when needed.

---

### Memory Efficient

Infinite sequences become possible.

---

### Encapsulation

Internal structure remains hidden.

---

### Flexible Traversal

Can support:

* DFS
* BFS
* Reverse order
* Round Robin

using the same interface.

---

# Disadvantages

### Extra Complexity

Simple loops are easier.

---

### Single-use Generators

Generators get exhausted.

---

### State Management

Iterator maintains current position.

---

# Iterator vs Iterable

| Feature                    | Iterator | Iterable |
| -------------------------- | -------- | -------- |
| Has next()                 | ✅        | ❌        |
| Implements Symbol.iterator | Optional | ✅        |
| Can be used with for...of  | ❌        | ✅        |
| Maintains state            | ✅        | ❌        |

---

# Iterator vs Loop

| Feature            | Loop | Iterator |
| ------------------ | ---- | -------- |
| Sequential access  | ✅    | ✅        |
| Lazy evaluation    | ❌    | ✅        |
| Infinite sequences | ❌    | ✅        |
| Encapsulation      | ❌    | ✅        |
| Uniform API        | ❌    | ✅        |

---

# Summary

```text
Collection
     ↓
Iterator
     ↓
next()
     ↓
{value, done}
     ↓
next()
     ↓
{value, done}
```

Internally:

```text
Array
Set
Map
Tree
Linked List
Database Cursor
```

all can expose the same interface:

```js
iterator.next()
```

---

## Key Idea

> **Iterator Pattern provides a standard way to sequentially access elements of a collection without exposing the collection's internal structure.**

It is the foundation behind:

* `for...of`
* Generators
* Symbol.iterator
* Spread operator
* Arrays
* Sets
* Maps
* Database cursors
* Streams
* Lazy evaluation

and is one of the most elegant behavioral patterns in JavaScript.
