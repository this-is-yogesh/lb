
Here is the ultra-short, crisp revision summary for Microservices Architecture.

---

### **The Crux**

A **Microservices Architecture** cuts a system into small, isolated, independently deployable apps. Each individual service is completely responsible for **one single business feature** and strictly owns its own independent database/storage tier.

---
Refer to image microservice_architecture.png

### **The Core Golden Rule: Database-Per-Service**

- **The Rule:** No service is ever allowed to touch another service's database directly.
- **The Execution:** If the `Feed Service` needs profile pictures, it *must* ask the `User Service` via an API call.
- **Why it Matters:** Keeping databases completely separated stops data-layer locking and allows individual teams to build, deploy, and scale their specific service without breaking anything else.

---

### **How Services Talk (The 3 Communication Patterns)**

| Pattern | How It Works | System Design Example |
| --- | --- | --- |
| **Synchronous** | Blocks and waits for an **immediate** answer. *(Uses HTTP/gRPC)* | `Feed Service` calls `User Service` to fetch thumbnail usernames before rendering a page. |
| **Asynchronous** | Fires a request and moves on; processed later via a **Message Queue**. | A user uploads a video; it is queued up for heavy background compression. |
| **Event-Driven** | Broadcasts an announcement (**Pub/Sub**); multiple services react at once. | A user clicks "Publish Post." This single event simultaneously triggers feed updates, push notifications, and analytics trackers. |

---

### **Fast Revision Pipeline**

```text
Monolith
All Features
      ↓
One Shared Process
      ↓
One Giant Database
(✗ Hard to Scale Teams)


Microservices
Feature A
      ↓
Isolated Process
      ↓
Isolated DB
(✓ Scaleable & Fault-Tolerant)
```
````
