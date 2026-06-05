
Here is the ultra-short, crisp summary of the Section 3 wrap-up for your final daily revision layer.

---

### **The Crux**

An application tier must be **stateless** to scale. You start with a simple, unified codebase (Monolith) and only break it into independent, domain-focused pieces (Microservices) when your traffic or engineering team size overloads single-process boundaries.

---

### **The Architecture Stack Cheat Sheet**

- **The Compute Options:** Bare Metal, VMs, Containers, or Serverless. They are all just computers running code.
- **The Gatekeepers:**
  - **Reverse Proxy:** Handles low-level network plumbing (TLS termination, static file caching, gzip compression).
  - **API Gateway:** Handles high-level application routing (JWT verification, user-based rate limiting, circuit breaking).
- **The Split:** Web servers handle connection plumbing, App servers process business logic rules, and Database servers manage disk storage safely.

---

### **Top 5 Section Interview Rules**

1. **The Stateless Declaration:** Always explicitly state: *"Our application servers are completely stateless; all session data lives externally in a shared Redis cache."*
2. **The Gateway Placement:** Draw an API Gateway directly behind your Load Balancer to centralize auth and rate limiting.
3. **The Domain Rule:** If you use microservices, isolate them by **business domain** (`Order Service`), never by technical layer (`Database Service`).
4. **The Monolith Bias:** Default to a clean monolith. Only split when forced by team friction or extreme, uneven scaling bottlenecks.
5. **The Proxy Distinction:** Remember that a reverse proxy manages raw network connections, while an API gateway inspects and alters application-level data.

---

### **The Scale & Timing Milestones**

- **Single Server Capacity:** ~1,000–5,000 RPS and up to 10,000 concurrent connections.
- **>1,000 DAU:** Separate the database server away from the application server.
- **>10,000 DAU:** Introduce a Load Balancer and spin up multiple stateless app servers.
- **>100,000 DAU (or 10+ engineers):** Evaluate splitting the Monolith into independent Microservices.

---

### **Fast Metric Sync**

```text
Single Server
(≤ 5k RPS)
        ↓
Separate DB
(1k+ DAU)
        ↓
Load Balancer
(10k+ DAU)
        ↓
Microservices
(100k+ DAU)
```
````
