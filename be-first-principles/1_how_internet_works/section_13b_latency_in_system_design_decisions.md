Here is the ultra-short, crisp revision summary for how latency shapes architectural decisions.

---

### **The Crux**

System design is simply the practice of pushing data operations as high up the speed hierarchy as possible. Every component you add to an architecture diagram is just a tool to solve a specific latency bottleneck.

---

### **The Architectural Toolkit (Problem → Solution)**

- **Cross-continent network lag?** → Use a **CDN** to serve data from the closest edge server.
- **Slow database disk reads?** → Use a **Cache (Redis)** to serve data from RAM.
- **Database read bottlenecks?** → Use **Read Replicas** to spread the query load.
- **Massive table scan delays?** → Use **Sharding** to break big tables into fast, tiny tables.
- **Heavy, blocking tasks?** → Use **Async Processing** to reply instantly and handle work in the background.
- **Constant TCP/TLS handshake lag?** → Use **Connection Pooling** to keep connection pipes open.

---

### **The Fast Latency Hierarchy Cheat Sheet**

```text
App Cache (1 μs)
    ↓
Redis (500 μs)
    ↓
DB Index Hit (1 ms)
    ↓
Cross-Service Call (5–50 ms)
    ↓
Cross-Region Call (50–200 ms)
```

Alternatively:

```text
App Cache (1 μs)
→ Redis (500 μs)
→ DB Index Hit (1 ms)
→ Cross-Service Call (5–50 ms)
→ Cross-Region Call (50–200 ms)
```

---

### **Interview Golden Rule**

Never speak in vague terms like *"it makes it faster."* Use quantitative reasoning to state your architectural impact.

> *Example:* "By placing a Redis cache in front of the database, we drop our read latency from a **10 ms** indexed disk query down to **500 μs** in RAM—a massive **20× improvement**."