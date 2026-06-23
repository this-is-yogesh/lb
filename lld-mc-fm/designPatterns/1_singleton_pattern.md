# Singleton Design Pattern in JavaScript

## What is Singleton?

A **Singleton** is a design pattern that ensures **only one instance (object)** is created throughout the application.

Whenever we request that object again, instead of creating a new one, the same object is returned.

---

## Definition

> **Singleton ensures that a class or function has only one instance and provides a global access point to it.**

---

## Why do we need Singleton?

Sometimes, creating multiple objects for the same purpose can lead to:

* Inconsistent state
* Increased memory usage
* Duplicate work
* Difficult synchronization

In such situations, we create only one object and share it everywhere.

---

## Real-world Analogy

Suppose there is only one CEO in a company.

Every department talks to the same CEO.

```text
HR Department
       ↓
Finance Department
       ↓
Engineering Department
       ↓
     CEO
```

No matter who asks, everyone interacts with the same person.

Similarly:

```text
Module A
     ↓
Module B
     ↓
Module C
     ↓
Singleton Object
```

All modules use the same object.

---

# Basic Idea

Without Singleton:

```js
const user1 = new User();
const user2 = new User();

console.log(user1 === user2);
```

Output:

```text
false
```

Two different objects are created.

---

With Singleton:

```js
const object1 = singleton.getInstance();
const object2 = singleton.getInstance();

console.log(object1 === object2);
```

Output:

```text
true
```

Both variables point to the same object.

---

# Flow of Singleton

```text
First Call
getInstance()
      ↓
No object exists
      ↓
Create object
      ↓
Store object
      ↓
Return object
```

Later calls:

```text
getInstance()
      ↓
Object already exists
      ↓
Return existing object
```

No new object is created.

---

# Implementing Singleton Using Closure

The most common approach is to use a closure.

```js
const Singleton = (function () {

  let instance;

  function createInstance() {

    const object = {
      message: "I am the instance"
    };

    return object;
  }

  return {

    getInstance() {

      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }

  };

})();
```

---

# Usage

```js
const object1 = Singleton.getInstance();
const object2 = Singleton.getInstance();

console.log(object1 === object2);
```

Output

```text
true
```

---

# How Does It Work?

Initially:

```text
instance = undefined
```

### First call

```js
Singleton.getInstance()
```

Flow:

```text
instance exists?
      ↓
No
      ↓
createInstance()
      ↓
instance = object
      ↓
return object
```

---

### Second call

```js
Singleton.getInstance()
```

Flow:

```text
instance exists?
      ↓
Yes
      ↓
Return existing object
```

No new object is created.

---

# Visual Representation

### First Time

```text
getInstance()
      ↓
instance = undefined
      ↓
create object
      ↓
Store in instance
      ↓
Return object
```

---

### Second Time

```text
getInstance()
      ↓
instance already exists
      ↓
Return same object
```

---

# Example 1: Notification Service

Suppose the whole application should have only one notification manager.

```js
const NotificationService = (() => {

  let instance;

  function createInstance() {

    return {

      send(message) {
        console.log("Notification:", message);
      }

    };

  }

  return {

    getInstance() {

      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }

  };

})();
```

Usage:

```js
const notification1 =
  NotificationService.getInstance();

const notification2 =
  NotificationService.getInstance();

console.log(
  notification1 === notification2
);
```

Output:

```text
true
```

Sending notifications:

```js
notification1.send("Order placed");
notification2.send("Payment successful");
```

Output:

```text
Notification: Order placed
Notification: Payment successful
```

Both calls use the same object.

---

# Example 2: Logger

Applications generally need only one logger.

```js
const Logger = (() => {

  let instance;

  function createInstance() {

    return {

      log(message) {
        console.log(
          `[LOG]: ${message}`
        );
      }

    };

  }

  return {

    getInstance() {

      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }

  };

})();
```

Usage:

```js
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(logger1 === logger2);
```

Output

```text
true
```

---

# Example 3: Database Connection

Creating database connections repeatedly is expensive.

Singleton ensures only one connection exists.

```js
const Database = (() => {

  let instance;

  function connect() {

    return {
      connectionId: Math.random()
    };

  }

  return {

    getInstance() {

      if (!instance) {

        console.log(
          "Creating connection..."
        );

        instance = connect();
      }

      return instance;
    }

  };

})();
```

Usage:

```js
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1.connectionId);
console.log(db2.connectionId);
```

Output

```text
Creating connection...

0.9382
0.9382
```

Connection is created only once.

---

# Example 4: Configuration Object

Configuration should be loaded once and shared everywhere.

```js
const Config = (() => {

  let instance;

  function createConfig() {

    return {

      apiUrl: "https://api.example.com",

      timeout: 5000

    };

  }

  return {

    getInstance() {

      if (!instance) {
        instance = createConfig();
      }

      return instance;
    }

  };

})();
```

Usage

```js
const config1 = Config.getInstance();
const config2 = Config.getInstance();

console.log(
  config1 === config2
);
```

Output

```text
true
```

---

# Singleton Using ES6 Class

```js
class Singleton {

  constructor() {

    if (Singleton.instance) {
      return Singleton.instance;
    }

    this.message = "I am Singleton";

    Singleton.instance = this;
  }

}
```

Usage:

```js
const object1 = new Singleton();
const object2 = new Singleton();

console.log(object1 === object2);
```

Output

```text
true
```

---

# Flow of Class Singleton

### First Object

```text
new Singleton()
      ↓
Singleton.instance ?
      ↓
No
      ↓
Create object
      ↓
Store in Singleton.instance
      ↓
Return object
```

---

### Second Object

```text
new Singleton()
      ↓
Singleton.instance ?
      ↓
Yes
      ↓
Return existing object
```

---

# Example 5: Counter

```js
const Counter = (() => {

  let instance;

  function createCounter() {

    let count = 0;

    return {

      increment() {
        count++;
      },

      getCount() {
        return count;
      }

    };

  }

  return {

    getInstance() {

      if (!instance) {
        instance = createCounter();
      }

      return instance;
    }

  };

})();
```

Usage

```js
const counter1 = Counter.getInstance();

counter1.increment();

const counter2 = Counter.getInstance();

console.log(
  counter2.getCount()
);
```

Output

```text
1
```

Even though we used `counter2`, it still remembers the state because both variables point to the same object.

---

# Where Is Singleton Used?

### 1. Database Connections

```text
App
 ↓
Singleton Database Connection
```

Avoids creating multiple connections.

---

### 2. Logger

```text
Entire Application
        ↓
Single Logger
```

Maintains centralized logs.

---

### 3. Notification Service

```text
All Modules
      ↓
Notification Manager
```

Ensures notifications are managed consistently.

---

### 4. Configuration Object

```text
Config File
      ↓
Singleton Config Object
```

Configuration is loaded once.

---

### 5. Cache Manager

```text
Application
      ↓
Singleton Cache
```

Shared cache across modules.

---

### 6. Redux Store

In React applications, the Redux store behaves like a Singleton.

```text
Components
     ↓
Redux Store
```

All components read and update the same state.

---

# Advantages

### Memory Efficient

Only one object exists.

---

### Shared State

All modules work with the same data.

---

### Global Access Point

Accessible from anywhere.

---

### Prevents Duplicate Resources

Useful for:

* Database connections
* Loggers
* Caches
* Configurations

---

# Disadvantages

### Global State

Changes made in one place affect everyone.

---

### Harder to Test

Because the same object is shared across tests.

---

### Hidden Dependencies

Modules become tightly coupled.

---

### Difficult to Reset

State persists throughout the application.

---

# Singleton vs Normal Object

| Feature          | Normal Object | Singleton |
| ---------------- | ------------- | --------- |
| Multiple Objects | ✅ Yes         | ❌ No      |
| Shared State     | ❌ No          | ✅ Yes     |
| Memory Usage     | Higher        | Lower     |
| Global Access    | ❌ No          | ✅ Yes     |
| Object Creation  | Every time    | Once      |

---

# Summary

```text
getInstance()
      ↓
instance exists?
      ↓
No --------------------→ Create object
↑                           ↓
|                       Store object
|                           ↓
Yes ←---------------- Return object
      ↓
Return existing object
```

### Key Idea

> **Singleton ensures that only one instance of an object exists throughout the application and provides a global access point to that instance.**

Typical real-world examples include:

* Database connections
* Logger services
* Notification managers
* Cache managers
* Configuration objects
* Redux store (conceptually)
