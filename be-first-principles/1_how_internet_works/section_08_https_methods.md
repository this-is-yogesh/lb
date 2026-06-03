# HTTP Methods

HTTP methods define the action to perform on a resource.

| Method | Purpose | Idempotent? |
|----------|---------|-------------|
| GET | Retrieve data | ✓ |
| POST | Create data | ✗ |
| PUT | Replace entire resource | ✓ |
| PATCH | Partially update resource | ✗ |
| DELETE | Remove resource | ✓ |

---

## Examples

```text
GET    /users/123
POST   /users
PUT    /users/123
PATCH  /users/123
DELETE /users/123
```

---

## Idempotency

An operation is **idempotent** if performing it multiple times produces the same result.

### Idempotent Operations

```text
GET /users/123

Call 10 times
↓
Same result
```

```text
DELETE /users/123

Call again
↓
User is already deleted
↓
State remains the same
```

```text
PUT /users/123

Replace with same data
↓
Final state is unchanged
```

---

### Non-Idempotent Operations

```text
POST /users

Call 3 times
↓
3 users created
```

Each request changes the state.

---

## Why Idempotency Matters

Distributed systems experience:

- Network failures
- Timeouts
- Retries

Example:

```text
POST /orders

User clicks twice
↓
Request retried
↓
Two orders created
↓
Duplicate payment
```

To avoid this, systems use:

- Idempotency keys
- Unique request IDs

Payment systems like Stripe rely heavily on this.

---

## REST Principle

- **Method → Action**
- **URL → Resource**

Examples:

```text
GET    /users/123
DELETE /posts/456
POST   /orders
PATCH  /users/123
```

Avoid:

```text
POST /getUser
POST /deletePost
```

---

## System Design Relevance

HTTP methods affect:

- API design
- Retry behavior
- Caching
- Load balancers
- Distributed systems

---

## Key Takeaway

> Method defines the action, URL identifies the resource.

```text
GET    → Read
POST   → Create
PUT    → Replace
PATCH  → Update
DELETE → Remove
```
**SECTION 8 - HTTP Methods**

What are HTTP Methods?
Each HTTP method tells the server what action the client wants to perform. Using the correct method is important because it affects caching, idempotency, and how proxies, CDNs, and load balancers handle the request.

Common HTTP Methods

| Method | Purpose                        | Idempotent? | Has Body? | Example |
|--------|--------------------------------|-------------|-----------|---------|
| GET    | Retrieve a resource            | Yes         | No        | GET /users/123 |
| POST   | Create a new resource          | No          | Yes       | POST /users |
| PUT    | Replace a resource entirely    | Yes         | Yes       | PUT /users/123 |
| PATCH  | Partially update a resource    | No          | Yes       | PATCH /users/123 |
| DELETE | Remove a resource              | Yes         | No        | DELETE /users/123 |

Idempotency Explained
Idempotent means calling the same operation multiple times gives the same result.

- GET, PUT, DELETE → Idempotent (safe to retry)
- POST, PATCH → Not idempotent (retrying can create duplicates)

Why Idempotency Matters in System Design
In real systems, network failures and retries are very common. 

If a user clicks "Submit Order" twice due to slow network:
- Using POST can create duplicate orders
- This causes problems like double charging

This is why payment systems (like Stripe) use idempotency keys with POST requests to prevent duplicates.

Common Interview Mistake
Using POST for everything (like POST /getUser or POST /deleteUser). 

Best practice: Use the correct HTTP method to show the action and the URL to identify the resource.
