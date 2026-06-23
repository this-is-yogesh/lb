# Circuit Breaker Design Pattern in JavaScript

## What is Circuit Breaker Pattern?

The **Circuit Breaker** is a resilience (fault-tolerance) design pattern used to **prevent cascading failures**.

Instead of repeatedly calling a failing service and overwhelming it, the circuit breaker temporarily stops requests and gives the service time to recover.

---

## Definition

> **Circuit Breaker prevents continuous requests to a failing system by temporarily blocking further calls after a certain number of failures.**

It is heavily used in:

* Microservices
* API communication
* Databases
* Payment gateways
* Third-party services
* Frontend applications

---

# Real-World Analogy

Think about the electrical circuit breaker in your home.

Normal flow:

```text
Electricity
     ↓
Switch
     ↓
Appliances
```

If too much current flows:

```text
Electricity
     ↓
Circuit Breaker Trips
     ↓
Power Stops
```

This protects your appliances from damage.

Similarly:

```text
Application
      ↓
API Server
```

If the server keeps failing:

```text
Application
      ↓
Circuit Breaker Trips
      ↓
No more requests
```

This prevents unnecessary load on the server.

---

# Why Do We Need Circuit Breaker?

Suppose your application calls an API.

Without Circuit Breaker:

```text
App
 ↓
API fails
 ↓
Retry
 ↓
API fails
 ↓
Retry
 ↓
API fails
 ↓
Retry again...
```

Thousands of requests may hit the already failing server.

This can cause:

* Server overload
* Cascading failures
* Poor user experience
* Increased latency

---

With Circuit Breaker:

```text
3 Failures
     ↓
Circuit Opens
     ↓
Requests blocked
     ↓
Wait 10 seconds
     ↓
Try again
```

The failing service gets time to recover.

---

# States of Circuit Breaker

There are three states.

---

## 1. Closed State (Normal)

Everything works normally.

Requests are allowed.

```text
App
 ↓
API
```

---

## 2. Open State

Too many failures occurred.

Requests are blocked.

```text
App
 ↓
Circuit Open
 ↓
Request Rejected
```

No request reaches the server.

---

## 3. Half-Open State

After waiting for some time, a few requests are allowed.

If they succeed:

```text
Half Open
     ↓
Success
     ↓
Closed State
```

If they fail:

```text
Half Open
     ↓
Failure
     ↓
Open State Again
```

---

# State Diagram

```text
          Success
      <-------------
     |               |
     |               |
Closed ----Failures----> Open
                           |
                           |
                      Wait Threshold
                           |
                           ↓
                      Half Open
                           |
               --------------------
               |                  |
            Success             Failure
               |                  |
               ↓                  ↓
            Closed              Open
```

---

# Basic Idea

Suppose:

* Maximum failures = 3
* Wait time = 5 seconds

Flow:

```text
Call #1 → Failed
Call #2 → Failed
Call #3 → Failed
--------------------
Circuit Opens
--------------------
Call #4 → Blocked
Call #5 → Blocked
Call #6 → Blocked
--------------------
Wait 5 seconds
--------------------
Try Again
```

---

# Implementation

The circuit breaker keeps track of:

* Number of failures
* Last failure time
* Whether service is open or closed

```js
const circuitBreaker = (
  fn,
  failureCount,
  timeThreshold
) => {

  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;

  return function (...args) {

    // service currently unavailable
    if (isClosed) {

      const diff =
        Date.now() -
        timeSinceLastFailure;

      // enough waiting time passed
      if (diff > timeThreshold) {

        isClosed = false;

      }
      else {

        console.log(
          "Service unavailable"
        );

        return;
      }
    }

    try {

      const result = fn(...args);

      failures = 0;

      return result;

    }
    catch (error) {

      failures++;

      timeSinceLastFailure =
        Date.now();

      if (
        failures >= failureCount
      ) {

        isClosed = true;
      }

      console.log("Error");
    }

  };

};
```

---

# Testing the Circuit Breaker

We create a function that fails three times.

```js
const testFunction = () => {

  let count = 0;

  return function () {

    count++;

    if (count < 4) {

      throw "failed";

    }

    return "hello";

  };

};
```

---

```js
let t = testFunction();

let c = circuitBreaker(
  t,
  3,
  200
);
```

---

Calling:

```js
c();
c();
c();
```

Output:

```text
Error
Error
Error
```

After 3 failures:

```text
Circuit Opens
```

---

Further calls:

```js
c();
c();
c();
```

Output:

```text
Service unavailable
Service unavailable
Service unavailable
```

No request reaches the original function.

---

After 300ms:

```js
setTimeout(() => {

  console.log(c());

}, 300);
```

Output:

```text
hello
```

---

# Flow of Execution

```text
Request
    ↓
Function Executes
    ↓
Success?
 ┌─────────────┐
 │     Yes     │
 └─────────────┘
       ↓
Reset failures
       ↓
Return response

       OR

       ↓
Failure
       ↓
Increment failure count
       ↓
Reached threshold?
       ↓
No → Keep Trying

Yes
 ↓
Open Circuit
 ↓
Block requests
 ↓
Wait threshold time
 ↓
Try again
```

---

# Example 1: API Calls

Without Circuit Breaker:

```js
fetch("/users")
```

If server is down:

```text
Retry
Retry
Retry
Retry
Retry...
```

Server receives thousands of requests.

---

With Circuit Breaker:

```text
3 failures
     ↓
Open circuit
     ↓
Reject requests immediately
```

Users receive:

```text
Service temporarily unavailable
```

instead of waiting.

---

# Example 2: Payment Gateway

Suppose Stripe is down.

Without Circuit Breaker:

```text
Order
 ↓
Stripe
 ↓
Failure
 ↓
Retry forever
```

This overloads Stripe even more.

---

With Circuit Breaker:

```text
3 failures
 ↓
Open Circuit
 ↓
Stop payment requests
 ↓
Try again after 30 seconds
```

---

# Example 3: Database Connections

```text
App
 ↓
Database
```

Database crashes.

Without Circuit Breaker:

```text
1000 requests/sec
 ↓
DB overload
 ↓
Entire system slows down
```

With Circuit Breaker:

```text
Failures exceed threshold
 ↓
Open circuit
 ↓
Reject requests immediately
```

Application remains responsive.

---

# Example 4: Third-Party Weather API

```text
Frontend
 ↓
Weather API
```

API becomes unavailable.

Instead of:

```text
Loading...
Loading...
Loading...
```

Circuit Breaker immediately returns:

```text
Weather service unavailable
```

---

# Example 5: Frontend Search Suggestions

Suppose autocomplete API is failing.

Without Circuit Breaker:

```text
Typing
 ↓
API request
 ↓
Failure
 ↓
More requests
```

Hundreds of unnecessary calls occur.

With Circuit Breaker:

```text
3 failures
 ↓
Disable search API temporarily
 ↓
Try again later
```

---

# Example 6: React Query / SWR

Libraries such as:

* React Query
* SWR

internally implement retry mechanisms and concepts similar to Circuit Breakers.

---

# Improved Version with Half-Open State

A production circuit breaker has three states:

```js
CLOSED
OPEN
HALF_OPEN
```

Flow:

```text
Closed
  ↓
Too many failures
  ↓
Open
  ↓
Wait threshold
  ↓
Half Open
  ↓
Success ?
```

If success:

```text
Half Open
 ↓
Closed
```

If failure:

```text
Half Open
 ↓
Open
```

---

# Advantages

### Prevents Cascading Failures

A broken service doesn't bring down the entire system.

---

### Reduces Server Load

Stops bombarding failing services.

---

### Faster Responses

Requests fail immediately instead of timing out.

---

### Improves User Experience

Users receive instant feedback.

---

### Helps Recovery

Gives the server time to recover.

---

# Disadvantages

### Additional Complexity

State management becomes more complicated.

---

### Incorrect Thresholds

Too small:

```text
Circuit opens frequently
```

Too large:

```text
Failures continue for longer
```

---

### Temporary Blocking

Healthy requests might be rejected while the circuit is open.

---

# Circuit Breaker vs Retry Pattern

| Feature                            | Retry Pattern | Circuit Breaker |
| ---------------------------------- | ------------- | --------------- |
| Retries failed requests            | ✅             | ❌               |
| Stops requests after many failures | ❌             | ✅               |
| Protects backend                   | ❌             | ✅               |
| Waits for recovery                 | ❌             | ✅               |
| Used together                      | ✅             | ✅               |

---

# Retry + Circuit Breaker

Usually both are combined.

```text
Request
 ↓
Failure
 ↓
Retry 3 times
 ↓
Still failing?
 ↓
Open Circuit
 ↓
Wait 30 sec
 ↓
Half Open
 ↓
Success?
 ↓
Closed
```

---

# Where Is Circuit Breaker Used?

### Microservices

```text
Service A
 ↓
Service B
```

---

### API Calls

```text
Frontend
 ↓
Backend
```

---

### Payment Systems

```text
App
 ↓
Stripe
```

---

### Databases

```text
Server
 ↓
MongoDB
```

---

### Message Queues

```text
Producer
 ↓
Kafka
```

---

### Cloud Services

```text
Application
 ↓
AWS
```

---

### External Third-Party APIs

```text
App
 ↓
Google Maps API
```

---

# Summary

```text
Request
   ↓
Success?
──────────────
Yes
 ↓
Closed State

No
 ↓
Failure Count++

Threshold Reached?
──────────────
No
 ↓
Keep Trying

Yes
 ↓
Open State
 ↓
Block Requests
 ↓
Wait Threshold
 ↓
Half Open
 ↓
Success ?
───────
Yes → Closed

No → Open
```

## Key Idea

> **Circuit Breaker prevents repeated calls to failing services by temporarily blocking requests after a certain number of failures, allowing the system to recover and preventing cascading failures.**

It is one of the most important resilience patterns used in:

* Microservices
* API communication
* Payment gateways
* Databases
* Cloud systems
* Frontend applications
* Distributed systems

and is frequently asked in **Atlassian, Uber, Amazon, and other system design interviews**.
