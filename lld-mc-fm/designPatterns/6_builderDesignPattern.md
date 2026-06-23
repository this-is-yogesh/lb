# Builder Design Pattern in JavaScript

## What is Builder Pattern?

The **Builder Pattern** is a **creational design pattern** used to create complex objects **step-by-step**.

Instead of passing everything to a constructor at once, we gradually build the object and finally obtain the desired result.

---

## Definition

> **Builder Pattern allows us to construct complex objects step-by-step and produce different representations of the same object using the same building process.**

---

# Why Do We Need Builder Pattern?

Suppose we have a `Payment` class.

```js
class Payment {

  constructor(currency, amount) {

    this.currency = currency;
    this.amount = amount;

  }

}
```

Usage:

```js
const payment =
  new Payment("₹", 1000);
```

This works fine for simple cases.

But what if:

* Amount is not known initially.
* Currency may change later.
* Taxes need to be added.
* Discounts need to be applied.
* Coupons may be optional.

Passing everything in the constructor becomes difficult.

---

# Real-world Analogy

Think about ordering a burger.

You don't specify everything at once.

Instead:

```text
Burger
 ↓
Add Cheese
 ↓
Add Tomato
 ↓
Add Fries
 ↓
Add Coke
 ↓
Serve
```

The burger is built gradually.

Similarly:

```text
Object
 ↓
addAmount()
 ↓
addCurrency()
 ↓
applyTax()
 ↓
pay()
```

---

# Traditional Constructor Approach

Suppose:

```js
class User {

  constructor(
    name,
    age,
    email,
    city,
    country,
    phone
  ) {

    this.name = name;
    this.age = age;
    this.email = email;
    this.city = city;
    this.country = country;
    this.phone = phone;

  }

}
```

Creating objects:

```js
const user =
  new User(
    "John",
    25,
    "john@gmail.com",
    "London",
    "UK",
    "999999"
  );
```

Problems:

* Constructor becomes huge.
* Optional parameters become confusing.
* Difficult to read.
* Order matters.

---

# Builder Pattern

Instead:

```js
new UserBuilder()
  .setName("John")
  .setAge(25)
  .setEmail("john@gmail.com")
  .build();
```

Much more readable.

---

# Method Chaining

Builder Pattern relies heavily on **method chaining**.

Each method returns:

```js
return this;
```

which allows the next method to be called.

---

Visual flow:

```text
Object
 ↓
method()
 ↓
return this
 ↓
method()
 ↓
return this
 ↓
method()
 ↓
Result
```

---

# Basic Payment Example

```js
class Payment {

  constructor(
    currency = "₹",
    amount = 0
  ) {

    this.currency = currency;
    this.amount = amount;

  }

  addAmount(val) {

    this.amount += val;

    return this;
  }

  pay() {

    console.log(
      `${this.currency} ${this.amount}`
    );

  }

}
```

---

Usage:

```js
const p1 = new Payment();

p1
  .addAmount(100)
  .addAmount(200)
  .addAmount(200)
  .pay();
```

Output:

```text
₹ 500
```

---

# Flow of Execution

```text
Payment()
    ↓
addAmount(100)
    ↓
return this
    ↓
addAmount(200)
    ↓
return this
    ↓
addAmount(200)
    ↓
pay()
```

---

# Adding Currency Dynamically

```js
class Payment {

  constructor(
    currency = "₹",
    amount = 0
  ) {

    this.currency = currency;
    this.amount = amount;

  }

  addAmount(val) {

    this.amount += val;

    return this;
  }

  addCurrency(currency) {

    this.currency = currency;

    return this;
  }

  pay() {

    console.log(
      `${this.currency} ${this.amount}`
    );

  }

}
```

---

Usage:

```js
const p1 = new Payment();

p1
  .addAmount(100)
  .addAmount(200)
  .addAmount(200)
  .pay();
```

Output:

```text
₹ 500
```

---

Change currency:

```js
p1
  .addAmount(200)
  .addCurrency("$")
  .pay();
```

Output:

```text
$ 700
```

---

# Visual Representation

```text
Payment
 ↓
Amount = 100
 ↓
Amount = 300
 ↓
Currency = $
 ↓
pay()
 ↓
$300
```

---

# Adding Reset

```js
class Payment {

  constructor() {

    this.currency = "₹";
    this.amount = 0;

  }

  addAmount(val) {

    this.amount += val;

    return this;
  }

  addCurrency(currency) {

    this.currency = currency;

    return this;
  }

  reset() {

    this.currency = "₹";
    this.amount = 0;

    return this;
  }

  pay() {

    console.log(
      `${this.currency} ${this.amount}`
    );

  }

}
```

---

Usage:

```js
p1
  .addAmount(500)
  .pay();

p1
  .reset()
  .addAmount(100)
  .pay();
```

Output:

```text
₹ 500
₹ 100
```

---

# Example 1: User Builder

Without Builder:

```js
new User(
  "John",
  25,
  "john@gmail.com",
  "London",
  "UK"
);
```

Hard to remember order.

---

With Builder:

```js
class UserBuilder {

  constructor() {

    this.user = {};

  }

  setName(name) {

    this.user.name = name;

    return this;
  }

  setAge(age) {

    this.user.age = age;

    return this;
  }

  setEmail(email) {

    this.user.email = email;

    return this;
  }

  build() {

    return this.user;
  }

}
```

---

Usage:

```js
const user =
  new UserBuilder()

    .setName("John")
    .setAge(25)
    .setEmail("john@gmail.com")

    .build();
```

Output:

```js
{
  name: "John",
  age: 25,
  email: "john@gmail.com"
}
```

---

# Example 2: URL Builder

```js
class URLBuilder {

  constructor() {

    this.url = "";

  }

  setProtocol(protocol) {

    this.url += protocol;

    return this;
  }

  setDomain(domain) {

    this.url += domain;

    return this;
  }

  setPath(path) {

    this.url += path;

    return this;
  }

  build() {

    return this.url;
  }

}
```

---

Usage:

```js
const url =
  new URLBuilder()

    .setProtocol("https://")
    .setDomain("google.com")
    .setPath("/search")

    .build();

console.log(url);
```

Output:

```text
https://google.com/search
```

---

# Example 3: Query Builder

```js
class QueryBuilder {

  constructor() {

    this.query = "SELECT *";

  }

  from(table) {

    this.query +=
      ` FROM ${table}`;

    return this;
  }

  where(condition) {

    this.query +=
      ` WHERE ${condition}`;

    return this;
  }

  build() {

    return this.query;
  }

}
```

---

Usage:

```js
const query =
  new QueryBuilder()

    .from("users")
    .where("age > 18")

    .build();

console.log(query);
```

Output:

```text
SELECT * FROM users WHERE age > 18
```

---

# Example 4: DOM Builder

```js
class ElementBuilder {

  constructor() {

    this.element =
      document.createElement("div");

  }

  addClass(name) {

    this.element.classList.add(
      name
    );

    return this;
  }

  setText(text) {

    this.element.innerText =
      text;

    return this;
  }

  build() {

    return this.element;
  }

}
```

---

Usage:

```js
const div =
  new ElementBuilder()

    .addClass("box")
    .setText("Hello")

    .build();
```

---

# Example 5: Axios Config Builder

```js
const config =
  new RequestBuilder()

    .setURL("/users")

    .setMethod("GET")

    .setHeaders({
      token: "abc"
    })

    .build();
```

Output:

```js
{
  url: "/users",
  method: "GET",
  headers: {
    token: "abc"
  }
}
```

---

# Builder Using Plain Object

Classes are not mandatory.

```js
const payment = {

  currency: "₹",

  amount: 0,

  addAmount(val) {

    this.amount += val;

    return this;
  },

  addCurrency(currency) {

    this.currency = currency;

    return this;
  },

  pay() {

    console.log(
      `${this.currency} ${this.amount}`
    );

  }

};
```

---

Usage:

```js
payment
  .addAmount(100)
  .addAmount(200)
  .addCurrency("$")
  .pay();
```

Output:

```text
$ 300
```

---

# build() Method

Most Builder patterns terminate with:

```js
build()
```

Example:

```js
new UserBuilder()
  .setName("John")
  .setAge(25)
  .build();
```

Flow:

```text
Create Object
     ↓
Add Properties
     ↓
Add More Properties
     ↓
build()
     ↓
Final Object
```

---

# Real Examples Around Us

### Axios

```js
axios
  .create()
```

followed by configuration.

---

### Express

```js
app
  .route("/users")
  .get()
  .post()
```

Method chaining resembles Builder.

---

### MongoDB Query

```js
User
  .find()
  .sort()
  .limit()
  .select()
```

Builder-like pattern.

---

### Jest

```js
expect(value)
  .toBe()
  .not
  .toEqual()
```

Method chaining.

---

### jQuery

```js
$("div")
  .hide()
  .fadeIn()
  .css();
```

Builder-style API.

---

# Advantages

### Readable

```js
new UserBuilder()
  .setName()
  .setAge()
```

is easier to understand.

---

### Handles Optional Values

No huge constructor.

---

### Flexible

Objects can be built gradually.

---

### Method Chaining

Provides elegant APIs.

---

### Avoids Constructor Explosion

Instead of:

```js
new User(
  a,b,c,d,e,f,g,h
)
```

we have:

```js
new UserBuilder()
```

---

# Disadvantages

### More Code

Extra builder class required.

---

### Overkill For Simple Objects

For:

```js
{
  name: "John"
}
```

Builder is unnecessary.

---

### Mutable During Construction

The object changes while being built.

---

# Builder vs Factory

| Feature                      | Builder | Factory  |
| ---------------------------- | ------- | -------- |
| Creates objects step-by-step | ✅       | ❌        |
| Supports method chaining     | ✅       | ❌        |
| Good for complex objects     | ✅       | Moderate |
| Returns object immediately   | ❌       | ✅        |
| Handles optional fields well | ✅       | ❌        |

---

# Where Is Builder Pattern Used?

### Query Builders

```text
MongoDB
SQL
```

---

### DOM Tree Creation

```text
HTML Elements
```

---

### API Configuration

```text
Axios
Fetch
```

---

### UI Components

```text
Dialogs
Forms
Menus
```

---

### Database Queries

```text
Mongoose
Sequelize
```

---

### Test Libraries

```text
Jest
Chai
```

---

### Express Routes

```text
app.route()
```

---

# Summary

```text
Create Builder
      ↓
Add Properties
      ↓
Method returns this
      ↓
Chain More Methods
      ↓
build()
      ↓
Final Object
```

## Key Idea

> **Builder Pattern allows us to construct complex objects step-by-step by separating the object creation process from its final representation.**

It is one of the most common creational patterns and is heavily used in:

* Query builders
* Mongoose
* Express
* Axios
* Jest
* jQuery
* DOM creation
* UI component libraries
* Configuration APIs

The Builder Pattern is essentially **method chaining with controlled object construction**.
