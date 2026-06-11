# Singleton Pattern

The Singleton pattern ensures that **only one instance** of an object exists throughout the application and provides a global access point to that instance.

---

## Classic JavaScript Singleton Implementation

```js
const Singleton = (function () {
    let instance;

    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
```

---

## How It Works

### First Call

```js
const obj1 = Singleton.getInstance();
```

- `instance` is `undefined`
- `createInstance()` is called
- Object is created and stored in `instance`
- The object is returned

```text
instance
   ↓
"I am the instance"
```

---

### Second Call

```js
const obj2 = Singleton.getInstance();
```

Since `instance` already exists:

```js
if (!instance) {
    instance = createInstance();
}
```

is skipped.

The same object is returned.

```text
obj1 ─┐
      ├──► instance ───► "I am the instance"
obj2 ─┘
```

---

## Production Example: Database Connection Pool

```js
// db.js

const { Pool } = require("pg");

let pool;

function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DB_URL
        });
    }

    return pool;
}

module.exports = getPool();
```

---

## Why Use Singleton Here?

Creating multiple database pools is expensive.

Without Singleton:

```js
new Pool();
new Pool();
new Pool();
```

Problems:

- Too many connections
- Higher memory usage
- Resource wastage
- Harder to manage

Instead, create the pool once and share it everywhere.

---

## How It Works

### First Time

When:

```js
require("./db");
```

is executed:

```text
pool = undefined
```

Therefore:

```js
pool = new Pool(...);
```

A database pool is created and returned.

```text
pool
 ↓
+----------------+
| PostgreSQL Pool |
+----------------+
```

---

### Subsequent Calls

Whenever another file does:

```js
require("./db");
```

Node returns the same exported object.

```text
UserService -----\
                  \
OrderService ------> PostgreSQL Pool
                  /
ProductService ---/
```

Only one pool exists.

---

# module.exports

`module.exports` defines what another file receives when it uses:

```js
require("./file");
```

---

## Exporting a Function

### greet.js

```js
function greet(name) {
    return `Hello ${name}`;
}

module.exports = greet;
```

### app.js

```js
const greet = require("./greet");

console.log(greet("John"));
```

Output:

```text
Hello John
```

---

## Exporting an Object

### math.js

```js
module.exports = {
    add(a, b) {
        return a + b;
    },

    subtract(a, b) {
        return a - b;
    }
};
```

### app.js

```js
const math = require("./math");

math.add(3, 4);
```

---

## In Our Database Example

```js
module.exports = getPool();
```

means:

1. Execute `getPool()`
2. Create the pool if it doesn't exist
3. Export the pool object

So:

```js
const pool = require("./db");
```

receives:

```text
+----------------+
| PostgreSQL Pool |
+----------------+
```

---

## Why Does This Behave Like a Singleton?

Node.js caches modules.

First time:

```js
require("./db");
```

Node:

1. Executes `db.js`
2. Creates the pool
3. Stores the exported value in memory

Second time:

```js
require("./db");
```

Node returns the cached object instead of executing the file again.

```text
require("./db")
        ↓
    db.js runs
        ↓
Pool created once
        ↓
Module cached
        ↓
Everyone gets same object
```

---

# Summary

### Singleton Pattern

> Create one instance and reuse it everywhere.

---

### Production Use Cases

- Database connection pool
- Logger
- Redis client
- Cache manager
- Config manager
- HTTP client
- WebSocket manager
- Event bus

---

### module.exports

> Specifies what another file receives when it calls `require()`.

```js
module.exports = something;
```

↓

```js
const x = require("./file");
```

↓

```js
x === something
```

---

### Key Idea

```text
Singleton = Create once, use everywhere.

module.exports = Share something with other files.

Node module caching = Automatically gives Singleton behavior.
```