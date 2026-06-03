# Client-Server Model at Scale
Basic architecture:

```text
Many Clients
      ↓
    Server
      ↓
   Database
```

A single server works well for small systems, but it cannot handle millions of users.

## The Core Problem

**System Design = How do we serve millions of clients reliably and efficiently?**

## Scaling the Architecture

The client-server model itself doesn't change. We add more components to scale it:

- **Load Balancers** → Distribute traffic across multiple servers.
- **Caches** → Reduce database load.
- **Databases** → Store data separately.
- **CDNs** → Serve content closer to users.

## Evolution of Architecture

Simple system:

```text
Clients
   ↓
Server
   ↓
Database
```

Scaled system:

```text
Clients
   ↓
Load Balancer
   ↓
Multiple Servers
   ↓
Cache / Database / CDN
```

## Key Takeaway

> System Design is fundamentally about scaling the simple **Client → Server → Database** architecture.


**SECTION 3B - client server model continued**


At its simplest, a client-server system looks like this:

Millions of clients → 1 Server → 1 Database

Example:
- 1,000 users open youtube.com at the same time
- All requests go to the same single server
- Server queries the database for each request
- Server sends response back to each client

This works fine for small scale. But at large scale (like YouTube with 2.5 billion users), a single server cannot handle the load.

What a Single Server Can Handle

| Metric                        | Typical Capacity          |
|-------------------------------|---------------------------|
| Concurrent connections        | 1,000 - 10,000            |
| Requests per second           | 500 - 5,000               |
| RAM                           | 8 - 64 GB                 |
| Storage                       | 1 - 10 TB                 |

YouTube Scale (for comparison):
- 500,000+ requests per second
- 500+ hours of video uploaded every minute
- 1 billion hours of video watched per day

A single server can handle only about 0.1% of YouTube's traffic.

The Fundamental Problem
How do you serve millions of clients reliably and with good performance? This is the core question system design solves.

The Rest of This Course
- Load balancers distribute clients across many servers
- Databases move data away from application servers
- Caches reduce database load
- CDNs serve content closer to users

The client-server model stays the same. We just scale it.
