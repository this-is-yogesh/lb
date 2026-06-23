# Proxy Design Pattern in JavaScript

## What is a Proxy?

A **Proxy** acts as an **intermediary (middleman)** between you and an original object.

Instead of directly accessing or modifying the original object, all operations go through the proxy, which can:

* Validate values
* Restrict access
* Log changes
* Monitor usage
* Add custom behavior

### Real-world analogy

```
You → Proxy → Original Object
```

For example, if someone wants to change a bank account balance:

```
User → Bank Employee → Bank Database
```

The bank employee verifies permissions and then forwards the request to the database.

Similarly in JavaScript:

```
Code → Proxy → Target Object
```

---

# Why do we need Proxy?

JavaScript objects are mutable and passed by reference.

Without any control:

```js
const person = {
  name: "Prashant",
  age: 28
};

person.age = "hello"; // No error
```

Since JavaScript is loosely typed, invalid updates can create bugs.

A Proxy allows us to intercept these operations and add restrictions.

---

# Syntax

```js
const proxy = new Proxy(target, handler);
```

### Parameters

#### 1. Target

The original object to be proxied.

```js
const person = {
  name: "Prashant",
  age: 28
};
```

#### 2. Handler

An object containing methods (called traps) that intercept operations.

Common traps:

* `get`
* `set`
* `has`
* `deleteProperty`
* `apply`
* `construct`

---

# Basic Example

```js
const person = {
  name: "Prashant",
  age: 28,
  gender: "male"
};

const proxiedPerson = new Proxy(person, {
  get() {
    // intercept property access
  },

  set() {
    // intercept property update
  }
});
```

Whenever we do:

```js
proxiedPerson.name
```

or

```js
proxiedPerson["name"]
```

the proxy intercepts the operation.

---

# Intercepting Property Access (`get`)

```js
const person = {
  name: "Prashant",
  age: 28,
  gender: "male"
};

const proxiedPerson = new Proxy(person, {
  get(obj, prop) {
    console.log(
      `${obj[prop]} is the value of property ${prop}`
    );

    return obj[prop];
  }
});

console.log(proxiedPerson.name);
```

### Output

```txt
Prashant is the value of property name
Prashant
```

---

# Intercepting Property Updates (`set`)

```js
const person = {
  name: "Prashant",
  age: 28
};

const proxiedPerson = new Proxy(person, {
  set(obj, prop, value) {
    console.log(
      `Changing ${prop} from ${obj[prop]} to ${value}`
    );

    obj[prop] = value;
  }
});

proxiedPerson.age = 29;
```

### Output

```txt
Changing age from 28 to 29
```

---

# Flow of Execution

Suppose:

```js
proxiedPerson.age = 29;
```

Execution flow:

```txt
age = 29
      ↓
Proxy intercepts
      ↓
set() trap executes
      ↓
Validation / Logging
      ↓
Original object updated
```

---

# Adding Validations

Suppose age should always be between 18 and 50.

```js
const person = {
  name: "Prashant",
  age: 28,
  gender: "male"
};

const proxiedPerson = new Proxy(person, {
  set(obj, prop, value) {

    if (prop === "age") {

      if (value < 18 || value > 50) {
        console.log(
          "Age should be between 18 and 50"
        );
      }
      else {
        obj[prop] = value;
      }

    } else {
      obj[prop] = value;
    }

  }
});

proxiedPerson.age = 17;
```

### Output

```txt
Age should be between 18 and 50
```

The original value remains:

```js
console.log(person.age);
// 28
```

---

# Making Properties Private

Suppose we don't want users to read `gender`.

```js
const proxiedPerson = new Proxy(person, {

  get(obj, prop) {

    if (prop === "gender") {
      console.log("Access denied");
      return undefined;
    }

    return obj[prop];
  }

});

console.log(proxiedPerson.gender);
```

### Output

```txt
Access denied
undefined
```

---

# Using Reflect

Instead of:

```js
obj[prop]
obj[prop] = value
```

we can use the `Reflect` object.

### Reading

```js
Reflect.get(obj, prop)
```

### Writing

```js
Reflect.set(obj, prop, value)
```

Example:

```js
const proxiedPerson = new Proxy(person, {

  get(obj, prop) {
    return Reflect.get(obj, prop);
  },

  set(obj, prop, value) {
    Reflect.set(obj, prop, value);
  }

});
```

---

# Why use Reflect?

Because it:

* Makes code cleaner.
* Works well with inheritance.
* Avoids recursion issues.
* Is considered the standard way to work with proxies.

---

# Common Proxy Traps

| Trap               | Triggered When      |
| ------------------ | ------------------- |
| `get()`            | Reading a property  |
| `set()`            | Updating a property |
| `has()`            | Using `in` operator |
| `deleteProperty()` | Deleting properties |
| `ownKeys()`        | Object.keys()       |
| `apply()`          | Calling a function  |
| `construct()`      | Using `new`         |

---

# Example 1: Logging Access

```js
const user = {
  name: "John"
};

const proxy = new Proxy(user, {

  get(target, prop) {

    console.log(
      `Reading ${prop}`
    );

    return Reflect.get(target, prop);
  }

});

console.log(proxy.name);
```

Output:

```txt
Reading name
John
```

---

# Example 2: Type Safety

Prevent changing age to a string.

```js
const person = {
  age: 28
};

const proxy = new Proxy(person, {

  set(target, prop, value) {

    if (
      prop === "age" &&
      typeof value !== "number"
    ) {

      throw Error(
        "Age must be a number"
      );

    }

    return Reflect.set(
      target,
      prop,
      value
    );

  }

});

proxy.age = "twenty";
```

### Output

```txt
Error: Age must be a number
```

---

# Example 3: Read-only Object

```js
const user = {
  name: "John",
  age: 25
};

const readOnlyUser = new Proxy(user, {

  set() {
    throw Error(
      "Object is read-only"
    );
  }

});

readOnlyUser.age = 30;
```

Output:

```txt
Error: Object is read-only
```

---

# Example 4: Default Values

Without proxy:

```js
console.log(user.city);
// undefined
```

With proxy:

```js
const user = {
  name: "John"
};

const proxy = new Proxy(user, {

  get(target, prop) {

    if (!(prop in target)) {
      return "Not Available";
    }

    return target[prop];

  }

});

console.log(proxy.city);
```

Output:

```txt
Not Available
```

---

# Example 5: Prevent Deletion

```js
const user = {
  name: "John",
  age: 25
};

const proxy = new Proxy(user, {

  deleteProperty(target, prop) {

    console.log(
      "Deletion not allowed"
    );

    return false;

  }

});

delete proxy.age;
```

Output:

```txt
Deletion not allowed
```

---

# Example 6: Function Proxy (`apply`)

A function can also be proxied.

```js
function sum(a, b) {
  return a + b;
}

const proxySum = new Proxy(sum, {

  apply(target, thisArg, args) {

    console.log(
      "Function called with",
      args
    );

    return Reflect.apply(
      target,
      thisArg,
      args
    );

  }

});

console.log(
  proxySum(10, 20)
);
```

Output

```txt
Function called with [10,20]
30
```

---

# Example 7: Array Proxy

Prevent negative values.

```js
const arr = [];

const proxyArray = new Proxy(arr, {

  set(target, index, value) {

    if (value < 0) {

      console.log(
        "Negative values not allowed"
      );

      return false;
    }

    return Reflect.set(
      target,
      index,
      value
    );

  }

});

proxyArray.push(5);
proxyArray.push(-10);
```

Output

```txt
Negative values not allowed
```

---

# Where are Proxies Used?

### 1. Vue 3 Reactivity

Vue 3 internally uses Proxy to track changes.

```txt
Object change
      ↓
Proxy detects
      ↓
Component re-renders
```

---

### 2. Form Validation

```js
user.age = 200;
```

Proxy intercepts and rejects invalid values.

---

### 3. Logging and Analytics

```js
user.name
```

can be logged automatically.

---

### 4. Access Control

Hide sensitive fields:

```js
password
token
creditCard
```

---

### 5. Read-only State

Prevent accidental mutations.

---

### 6. Caching

Return previously computed values instead of recalculating.

---

# Performance Implications

Proxy is powerful but every operation passes through an extra layer.

```txt
Without Proxy

Code → Object

With Proxy

Code → Proxy → Object
```

Because every read/write operation is intercepted, excessive usage may slow down the application.

### Use Proxy when:

✅ Validation is required
✅ Monitoring changes
✅ Logging access
✅ Security restrictions
✅ Reactive systems

### Avoid using Proxy when:

❌ Performance is critical
❌ Millions of property accesses occur frequently
❌ Simple objects don't need interception

---

# Summary

```txt
Target Object
      ↓
Proxy
(get, set, delete, apply...)
      ↓
Validation / Logging / Security
      ↓
Original Object
```

**Proxy allows you to intercept operations on objects or functions and inject custom behavior before forwarding them to the original target.**

It is one of the most powerful metaprogramming features introduced in ES6.
