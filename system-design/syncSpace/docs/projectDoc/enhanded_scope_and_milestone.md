Yes, I would add **Redis**, but **only after we've built the core application**. That's actually how a real engineering team would do it. They don't introduce Redis on day one—they add it when they identify a performance or scalability problem.

Here's how I'd justify Redis.

---

# 15. Redis

## First, what is Redis in simple English?

Think of PostgreSQL as a **filing cabinet**.

Whenever you need a document, you walk to the filing cabinet, open a drawer, find the file, and bring it back.

Now imagine you keep asking for the **same document** every few seconds.

Walking to the filing cabinet every time is unnecessary.

Instead, you keep a copy **on your desk**.

That desk is Redis.

Redis is an **in-memory data store**, meaning it stores data in RAM instead of on disk. Because RAM is much faster than disk, reading data from Redis is typically **orders of magnitude faster** than reading from a traditional database.

---

# Why Redis for this project?

Our application will eventually have:

* Hundreds of users
* Thousands of documents
* Frequent document opens
* Active collaboration sessions
* Many WebSocket connections

Without Redis, every request might look like this:

```text
Browser

↓

Express

↓

PostgreSQL

↓

Express

↓

Browser
```

Even if the document hasn't changed.

With Redis:

```text
Browser

↓

Express

↓

Redis

↓

Browser
```

Only if the document isn't in Redis do we query PostgreSQL and then cache the result.

This significantly reduces database load and improves response times.

---

# Where will we use Redis?

## 1. Document Cache ⭐⭐⭐⭐⭐

Imagine a user opens the same document repeatedly.

Without Redis:

```
Open document

↓

PostgreSQL

↓

Return
```

Every single time.

With Redis:

```
Open document

↓

Redis

↓

Return in milliseconds
```

---

## 2. WebSocket Presence ⭐⭐⭐⭐⭐

Suppose 10 people are editing the same document.

We need to know:

```
User A online

User B online

User C typing

User D viewing
```

This information changes constantly.

We **don't** want to store it in PostgreSQL.

Redis is perfect because this data is:

* temporary
* fast-changing
* doesn't need permanent storage

---

## 3. Active Collaboration Rooms

Redis can keep track of:

```
Document 123

↓

Users

↓

A

B

C

D
```

Whenever someone joins or leaves, Redis updates instantly.

---

## 4. Rate Limiting

Protect APIs such as:

```
POST /login
```

Without Redis:

A malicious user could send thousands of requests.

With Redis:

```
IP Address

↓

Request Count

↓

Too many requests

↓

429
```

Redis efficiently tracks request counts with expiration times.

---

## 5. Session Storage (Optional)

Instead of storing sessions in memory on one server, Redis can store them centrally.

That way, if you have multiple backend servers, any server can access the session.

---

## 6. Pub/Sub for Scaling ⭐⭐⭐⭐⭐

This is one of the most interesting interview topics.

Imagine:

Server A

```
User A edits document.
```

Server B

```
User B is connected.
```

How does Server B know about User A's edit?

Redis provides a **Publish/Subscribe (Pub/Sub)** mechanism.

```
Server A

↓

Redis Pub/Sub

↓

Server B

↓

Server C

↓

Server D
```

All servers receive the update and broadcast it to their connected users.

This becomes essential if your application grows beyond a single backend instance.

---

# Alternatives

### Memcached

Pros:

* Very fast
* Simple caching

Cons:

* Cache only
* No Pub/Sub
* Fewer data structures

Redis is more versatile.

---

### PostgreSQL

Could PostgreSQL act as the cache?

Technically, yes.

But then every request still goes to disk, defeating the purpose of a dedicated in-memory cache.

---

### In-Memory JavaScript Objects

Example:

```js
const cache = {};
```

Works for development.

But if the server restarts:

```
Everything disappears.
```

And if you run two backend servers:

```
Server A has one cache.

Server B has another.
```

They're out of sync.

Redis solves this by acting as a shared cache.

---

# Trade-offs

## Pros

* Extremely fast
* Reduces database load
* Excellent for caching
* Great for real-time presence
* Supports Pub/Sub
* Useful data structures (sets, hashes, sorted sets, etc.)
* Simple TTL (time-to-live) support

---

## Cons

* Additional infrastructure to run and monitor
* Cached data can become stale if invalidation isn't handled correctly
* Uses RAM, which is more expensive than disk storage
* Adds operational complexity

---

# When should we introduce Redis?

**Not on Day 1.**

I'd structure the project like this:

### Milestone 1

* React
* Express
* PostgreSQL
* Prisma

### Milestone 2

* Offline support
* IndexedDB
* Sync engine

### Milestone 3

* WebSockets
* Collaboration

### **Milestone 4**

* Redis
* Document caching
* Presence tracking
* Rate limiting
* Pub/Sub support

This progression mirrors how many production systems evolve: start simple, measure where the bottlenecks are, then introduce Redis to solve concrete performance and scalability problems rather than adding it preemptively. That's a design decision interviewers generally appreciate because it shows you're using technology to address specific needs, not just to expand the stack.
