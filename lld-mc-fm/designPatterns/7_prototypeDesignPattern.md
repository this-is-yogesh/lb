# Prototype Design Pattern in JavaScript

## What is Prototype Pattern?

The **Prototype Pattern** is a creational design pattern that allows objects to **share properties and methods through a prototype chain instead of creating copies for every object**.

Instead of duplicating methods inside each object, we define them once on a prototype and all instances can access them.

---

## Definition

> **Prototype Pattern creates objects by inheriting properties and methods from another object (prototype), allowing behavior to be shared among all instances.**

---

# Why Do We Need Prototype Pattern?

Suppose we create two robots:

```js
class Robot {

  constructor(name) {
    this.name = name;
  }

  fire() {
    return "Phew Phew";
  }

}
```

```js
const robo1 = new Robot("RoboCop");
const robo2 = new Robot("AutoBot");
```

Both objects need access to:

```js
fire()
```

Without prototypes, each object would have its own copy of the method:

```text
Robot1
 ├── name
 └── fire()

Robot2
 ├── name
 └── fire()
```

Memory would be wasted.

Instead:

```text
Robot1
 └─────┐
        ↓
     Prototype
        ↑
 ┌──────┘
Robot2
```

Both objects share the same method.

---

# What is Prototype in JavaScript?

Every object in JavaScript has an internal reference to another object called its **prototype**.

Example:

```js
let obj = {};
```

Internally:

```text
obj
 ↓
Object.prototype
 ↓
null
```

---

## Classes and Prototypes

```js
class Robot {

  constructor(name) {

    this.name = name;

  }

  fire() {

    return "Phew Phew";

  }

}
```

```js
const robo1 = new Robot("RoboCop");
```

Structure:

```text
robo1
  ↓
Robot.prototype
  ↓
Object.prototype
  ↓
null
```

---

# **proto** and prototype

### Constructor has:

```js
Robot.prototype
```

which stores shared methods.

---

### Instance has:

```js
robo1.__proto__
```

which points to:

```js
Robot.prototype
```

Example:

```js
console.log(
  robo1.__proto__ === Robot.prototype
);
```

Output:

```text
true
```

---

# What is Prototype Chain?

Whenever JavaScript tries to find a property:

1. Search current object.
2. If not found, search prototype.
3. Then prototype's prototype.
4. Continue until `null`.

---

Visual:

```text
Current Object
      ↓
Parent Prototype
      ↓
Grandparent Prototype
      ↓
Object.prototype
      ↓
null
```

This is called the **Prototype Chain**.

---

# Example

```js
class Robot {

  constructor(name) {

    this.name = name;

  }

}
```

Create robots:

```js
const robo1 = new Robot("RoboCop");
const robo2 = new Robot("AutoBot");
```

Add a method later:

```js
Robot.prototype.report =
function() {

  console.log(
    `${this.name} reporting sir!`
  );

};
```

---

Call:

```js
robo1.report();
robo2.report();
```

Output:

```text
RoboCop reporting sir!
AutoBot reporting sir!
```

---

# Flow of Execution

Suppose:

```js
robo1.report();
```

JavaScript searches:

```text
robo1
 ↓
Does report exist?
 ↓
No
 ↓
Robot.prototype
 ↓
Found report()
 ↓
Execute report()
```

---

# Visual Representation

```text
robo1
 ├── name = "RoboCop"
 └─────────────┐
               ↓
        Robot.prototype
        └── report()
```

Similarly:

```text
robo2
 ├── name = "AutoBot"
 └─────────────┐
               ↓
        Robot.prototype
        └── report()
```

Both share the same method.

---

# Property Lookup Priority

Suppose:

```js
class Robot {

  constructor(name) {

    this.name = name;

  }

}
```

Add:

```js
Robot.prototype.name = "ABC";
```

and:

```js
Robot.prototype.report =
function() {

  console.log(
    `${this.name} reporting sir!`
  );

};
```

Call:

```js
robo1.report();
```

Output:

```text
RoboCop reporting sir!
```

Why?

Because JavaScript first looks inside:

```text
robo1.name
```

before checking:

```text
Robot.prototype.name
```

Nearest scope wins.

---

# Removing Instance Property

```js
class Robot {

  constructor(name) {
    // this.name removed
  }

}
```

Add:

```js
Robot.prototype.name = "ABC";
```

Now:

```js
robo1.report();
```

Output:

```text
ABC reporting sir!
```

Because JavaScript could not find:

```js
robo1.name
```

so it searched the prototype.

---

# Prototype Chain with Inheritance

```js
class Robot {

  constructor(name) {

    this.name = name;

  }

}
```

---

Child class:

```js
class Transform extends Robot {

  constructor(name, nature) {

    super(name);

    this.nature = nature;

  }

}
```

Create:

```js
const robo1 =
  new Transform(
    "RoboCop",
    "good"
  );
```

Add:

```js
Robot.prototype.report =
function() {

  console.log(
    `${this.name} reporting sir!`
  );

};
```

Call:

```js
robo1.report();
```

Output:

```text
RoboCop reporting sir!
```

---

# Prototype Chain Flow

```text
robo1
 ↓
Transform.prototype
 ↓
Robot.prototype
 ↓
Object.prototype
 ↓
null
```

---

Searching for:

```js
report()
```

Flow:

```text
robo1
 ↓
Not found
 ↓
Transform.prototype
 ↓
Not found
 ↓
Robot.prototype
 ↓
Found
```

---

# Prototype Pattern

The Prototype Pattern means:

> Define methods once on the prototype and share them among all objects.

---

Without Prototype Pattern

```text
Robot1
 ├── fire()
 ├── report()

Robot2
 ├── fire()
 ├── report()
```

Multiple copies exist.

---

With Prototype Pattern

```text
Robot1
    ↓
Robot.prototype
    ↑
Robot2
```

Single copy shared by everyone.

---

# Example 1: Attendance System

```js
class Employee {

  constructor(name) {

    this.name = name;

  }

}
```

Shared method:

```js
Employee.prototype.markAttendance =
function() {

  console.log(
    `${this.name} present`
  );

};
```

Usage:

```js
const emp1 =
  new Employee("John");

const emp2 =
  new Employee("David");

emp1.markAttendance();
emp2.markAttendance();
```

Output:

```text
John present
David present
```

Only one copy of:

```js
markAttendance()
```

exists.

---

# Example 2: Student Objects

```js
class Student {

  constructor(name) {

    this.name = name;

  }

}
```

Shared method:

```js
Student.prototype.study =
function() {

  console.log(
    `${this.name} studying`
  );

};
```

Usage:

```js
const s1 =
  new Student("Alex");

const s2 =
  new Student("Mike");
```

Output:

```text
Alex studying
Mike studying
```

---

# Example 3: Extending Arrays

```js
Array.prototype.append =
function(str) {

  return this.map(
    item =>
      `${str} ${item}`
  );

};
```

Usage:

```js
const arr =
[1,2,3,4,5];

console.log(
  arr.append("Hello")
);
```

Output:

```text
[
 "Hello 1",
 "Hello 2",
 "Hello 3",
 "Hello 4",
 "Hello 5"
]
```

---

# Example 4: Extending String

```js
String.prototype.reverse =
function() {

  return this
    .split("")
    .reverse()
    .join("");

};
```

Usage:

```js
console.log(
  "hello".reverse()
);
```

Output:

```text
olleh
```

---

# Example 5: Using Object.create()

JavaScript can create objects from other objects.

```js
const animal = {

  eat() {

    console.log(
      "Eating"
    );

  }

};
```

Clone:

```js
const dog =
Object.create(animal);

dog.name = "Tommy";
```

Call:

```js
dog.eat();
```

Output:

```text
Eating
```

Structure:

```text
dog
 ↓
animal
 ↓
Object.prototype
 ↓
null
```

---

# Real Examples Around Us

### Arrays

```js
[].map()
[].filter()
[].find()
```

come from:

```js
Array.prototype
```

---

### Strings

```js
"abc".toUpperCase()
```

comes from:

```js
String.prototype
```

---

### Functions

```js
bind()
call()
apply()
```

come from:

```js
Function.prototype
```

---

### Objects

```js
hasOwnProperty()
```

comes from:

```js
Object.prototype
```

---

# Advantages

### Memory Efficient

Methods are shared.

---

### Reusable

Single implementation serves all objects.

---

### Supports Inheritance

Child objects automatically inherit parent behavior.

---

### Dynamic

Methods can be added even after objects are created.

---

Example:

```js
Robot.prototype.report =
function(){};
```

Immediately becomes available to all existing objects.

---

# Disadvantages

### Deep Prototype Chains

Can slow property lookup.

---

### Debugging Complexity

Finding where a property originates can be difficult.

---

### Modifying Built-in Prototypes Is Dangerous

Avoid:

```js
Array.prototype.myMethod =
function(){};
```

because it may:

* Conflict with future JavaScript features.
* Affect third-party libraries.

---

# Prototype vs Class

| Feature              | Prototype | Class                     |
| -------------------- | --------- | ------------------------- |
| Native mechanism     | ✅         | Internally uses prototype |
| Shared methods       | ✅         | ✅                         |
| Supports inheritance | ✅         | ✅                         |
| Syntax               | Complex   | Cleaner                   |
| Introduced in ES6    | ❌         | ✅                         |

---

# Prototype vs Instance Properties

| Property Type | Stored Where    |
| ------------- | --------------- |
| name          | Object Instance |
| age           | Object Instance |
| report()      | Prototype       |
| fire()        | Prototype       |

---

# Where Is Prototype Pattern Used?

### Classes

```js
class User {}
```

Internally use prototypes.

---

### Arrays

```js
map()
filter()
reduce()
```

---

### Strings

```js
trim()
slice()
```

---

### Function Methods

```js
call()
apply()
bind()
```

---

### Object.create()

```js
Object.create()
```

---

### Inheritance

```js
extends
super
```

---

### DOM Elements

```js
document.createElement()
```

All DOM elements inherit behavior through prototype chains.

---

# Summary

```text
Object Instance
      ↓
Prototype
      ↓
Parent Prototype
      ↓
Object.prototype
      ↓
null
```

When accessing:

```js
obj.property
```

JavaScript searches:

```text
Current Object
      ↓
Parent Prototype
      ↓
Grandparent Prototype
      ↓
Object.prototype
      ↓
null
```

until it finds the property.

---

## Key Idea

> **Prototype Pattern allows objects to share properties and methods through inheritance and prototype chains, avoiding duplication and improving memory efficiency.**

It is the fundamental mechanism behind:

* Classes
* Inheritance
* Arrays
* Strings
* Functions
* Object.create()
* DOM objects

In fact, **every object-oriented feature in JavaScript is ultimately built on top of prototypes.**
