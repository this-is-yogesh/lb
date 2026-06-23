# Observer Design Pattern in JavaScript

## What is Observer Pattern?

The **Observer Pattern** (also called **Publish-Subscribe (Pub/Sub) Pattern**) is a behavioral design pattern in which:

* One object (**Subject / Publisher / Host**) maintains a list of subscribers.
* Whenever something changes or an event occurs, the subject automatically notifies all subscribers (observers).

---

## Definition

> **Observer Pattern defines a one-to-many relationship where multiple objects are automatically notified whenever the state of another object changes.**

---

# Real-World Analogy

Think of a **YouTube channel**.

```text
YouTube Channel
       ↓
----------------------
↓         ↓          ↓
Subscriber A  Subscriber B  Subscriber C
```

Whenever the channel uploads a video:

```text
New Video Uploaded
        ↓
Notification sent to all subscribers
```

Subscribers can:

* Subscribe ✔️
* Unsubscribe ✔️
* Receive notifications ✔️

---

# Why Do We Need Observer Pattern?

Suppose an e-commerce website has:

* Email Service
* SMS Service
* Push Notification Service

When an order is placed:

```text
Order Placed
     ↓
Send Email
Send SMS
Send Push Notification
```

Without Observer Pattern:

```js
placeOrder() {
    sendEmail();
    sendSMS();
    sendPushNotification();
}
```

The order service becomes tightly coupled with these services.

Adding another notification system means modifying `placeOrder()`.

Observer Pattern solves this problem by making components independent.

---

# Components of Observer Pattern

There are two participants:

## 1. Subject (Host / Publisher)

Responsible for:

* Maintaining observers
* Allowing subscription
* Allowing unsubscription
* Notifying observers

---

## 2. Observer (Subscriber)

Responsible for:

* Listening for events
* Performing actions when notified

---

# Visual Representation

```text
              Subject
                 |
      -----------------------
      |          |          |
 Observer1   Observer2   Observer3
```

When an event occurs:

```text
Event occurs
      ↓
Subject notified
      ↓
Observer1 executes
Observer2 executes
Observer3 executes
```

---

# Creating Observer Pattern

We'll create:

* subscribe()
* unsubscribe()
* notify()

---

## Implementation

```js
function Move() {

  this.handlers = [];

  // subscribe
  this.subscribe = function (fn) {
    this.handlers.push(fn);
  };

  // unsubscribe
  this.unsubscribe = function (fn) {
    this.handlers =
      this.handlers.filter(
        item => item !== fn
      );
  };

  // notify observers
  this.fire = function (data) {

    this.handlers.forEach(handler => {
      handler(data);
    });

  };

}
```

---

# Creating Observers

```js
const moveHandler = function (item) {
  console.log("fired:", item);
};

const moveHandler2 = function (item) {
  console.log("Moved:", item);
};
```

---

# Creating Subject

```js
const move = new Move();
```

---

# Subscribe Observer

```js
move.subscribe(moveHandler);
```

Current structure:

```text
Move
 ↓
moveHandler
```

---

# Trigger Event

```js
move.fire("event #1");
```

Output:

```text
fired: event #1
```

---

# Unsubscribe

```js
move.unsubscribe(moveHandler);
```

Now:

```text
Move
(no subscribers)
```

Trigger:

```js
move.fire("event #2");
```

Output:

```text
(nothing)
```

---

# Multiple Subscribers

```js
move.subscribe(moveHandler);
move.subscribe(moveHandler2);

move.fire("event #3");
```

Output:

```text
fired: event #3
Moved: event #3
```

---

# Flow of Observer Pattern

Suppose:

```js
move.fire("event #3");
```

Execution:

```text
fire()
   ↓
Loop through subscribers
   ↓
moveHandler()
moveHandler2()
   ↓
All observers execute
```

---

# Complete Example

```js
function Move() {

  this.handlers = [];

  this.subscribe = function (fn) {
    this.handlers.push(fn);
  };

  this.unsubscribe = function (fn) {
    this.handlers =
      this.handlers.filter(
        item => item !== fn
      );
  };

  this.fire = function (data) {

    this.handlers.forEach(handler => {
      handler(data);
    });

  };

}

const moveHandler = item =>
  console.log("fired:", item);

const moveHandler2 = item =>
  console.log("Moved:", item);

const move = new Move();

move.subscribe(moveHandler);

move.fire("event #1");

move.unsubscribe(moveHandler);

move.fire("event #2");

move.subscribe(moveHandler);
move.subscribe(moveHandler2);

move.fire("event #3");
```

Output:

```text
fired: event #1

fired: event #3
Moved: event #3
```

---

# Example 1: Button Click Event

JavaScript event listeners internally follow the Observer Pattern.

```js
button.addEventListener(
  "click",
  handler
);
```

Structure:

```text
Button
   ↓
----------------
↓              ↓
handler1    handler2
```

When clicked:

```text
Button clicked
      ↓
handler1()
handler2()
```

---

# Example 2: Chat Application

Users subscribe to a chat room.

```text
Chat Room
      |
----------------------
|         |          |
User A   User B    User C
```

Message arrives:

```text
New Message
      ↓
Notify all users
```

---

Implementation:

```js
function ChatRoom() {

  this.users = [];

  this.subscribe = function(fn) {
    this.users.push(fn);
  };

  this.sendMessage = function(message) {

    this.users.forEach(user => {
      user(message);
    });

  };

}

const room = new ChatRoom();

room.subscribe(
  msg => console.log(
    "User A:", msg
  )
);

room.subscribe(
  msg => console.log(
    "User B:", msg
  )
);

room.sendMessage(
  "Hello everyone"
);
```

Output

```text
User A: Hello everyone
User B: Hello everyone
```

---

# Example 3: Stock Price Updates

```text
Stock Market
      ↓
----------------------
↓          ↓         ↓
Trader A  Trader B  Trader C
```

Price changes:

```text
Stock Price Updated
      ↓
Notify all traders
```

---

```js
function StockMarket() {

  this.traders = [];

  this.subscribe = function(fn) {
    this.traders.push(fn);
  };

  this.updatePrice = function(price) {

    this.traders.forEach(
      trader => trader(price)
    );

  };

}

const market =
  new StockMarket();

market.subscribe(
  price =>
    console.log(
      "Trader A:", price
    )
);

market.subscribe(
  price =>
    console.log(
      "Trader B:", price
    )
);

market.updatePrice(1500);
```

Output

```text
Trader A: 1500
Trader B: 1500
```

---

# Example 4: Order Placed

```text
Order Service
      ↓
-----------------------
↓          ↓          ↓
Email     SMS       Push
Service   Service   Service
```

Order placed:

```text
Order Created
      ↓
Email sent
SMS sent
Push notification sent
```

---

```js
function OrderService() {

  this.listeners = [];

  this.subscribe = function(fn) {
    this.listeners.push(fn);
  };

  this.placeOrder = function(orderId) {

    console.log(
      "Order Created"
    );

    this.listeners.forEach(
      listener =>
        listener(orderId)
    );

  };

}

const order =
  new OrderService();

order.subscribe(
  id =>
    console.log(
      "Email sent for",
      id
    )
);

order.subscribe(
  id =>
    console.log(
      "SMS sent for",
      id
    )
);

order.placeOrder("ORD123");
```

Output

```text
Order Created
Email sent for ORD123
SMS sent for ORD123
```

---

# Example 5: React State Updates

Suppose multiple components depend on state.

```text
Redux Store
      |
---------------------
↓          ↓         ↓
Navbar   Profile   Cart
```

When state changes:

```text
State Updated
      ↓
Navbar re-renders
Profile re-renders
Cart re-renders
```

Redux follows the Observer Pattern.

---

# Example 6: Node.js EventEmitter

```js
const EventEmitter =
  require("events");

const emitter =
  new EventEmitter();

emitter.on(
  "login",
  user =>
    console.log(
      "Welcome", user
    )
);

emitter.emit(
  "login",
  "Prashant"
);
```

Output

```text
Welcome Prashant
```

Here:

* `on()` → subscribe
* `emit()` → notify

---

# Observer Pattern vs Singleton

| Feature               | Observer      | Singleton         |
| --------------------- | ------------- | ----------------- |
| Multiple Objects      | Yes           | No                |
| Communication         | One-to-many   | One object shared |
| Main Purpose          | Notifications | Single instance   |
| Subscribers           | Multiple      | None              |
| State Change Reaction | Yes           | No                |

---

# Advantages

### Loose Coupling

Subject doesn't know details about observers.

---

### Dynamic Subscription

Observers can subscribe and unsubscribe anytime.

---

### One-to-Many Relationship

One event can trigger multiple actions.

---

### Extensible

Adding new observers doesn't require modifying existing code.

---

### Foundation of Event-Driven Programming

Used heavily in JavaScript.

---

# Disadvantages

### Too Many Observers

Can make debugging difficult.

---

### Memory Leaks

Forgetting to unsubscribe may cause unused listeners to remain.

---

### Notification Order

Execution order of observers may matter unexpectedly.

---

### Performance

Thousands of observers can slow down notifications.

---

# Where Is Observer Pattern Used?

### DOM Events

```js
button.addEventListener(
  "click",
  handler
);
```

---

### Node.js EventEmitter

```js
emitter.on()
emitter.emit()
```

---

### Redux Store

```js
store.subscribe()
```

---

### WebSocket Messages

```text
Server
  ↓
Clients
```

---

### Chat Applications

```text
Room
 ↓
Users
```

---

### Stock Market Updates

```text
Market
 ↓
Traders
```

---

### Notification Systems

```text
Service
 ↓
Email / SMS / Push
```

---

# Summary

```text
                Subject
                    |
      --------------------------------
      |              |              |
  Observer1      Observer2      Observer3
      |              |              |
      --------------------------------
                    ↑
              Event Occurs
                    ↑
              Subject Notifies
```

### Key Idea

> **Observer Pattern establishes a one-to-many relationship between objects so that when one object changes state, all dependent objects are automatically notified and updated.**

It is one of the fundamental patterns behind:

* DOM Events
* Event Listeners
* Node.js EventEmitter
* Redux
* WebSockets
* Reactivity systems
* Event-driven programming in JavaScript
