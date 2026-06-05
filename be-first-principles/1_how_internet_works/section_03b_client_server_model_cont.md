Here is the ultra-short, crisp revision summary.

---

### **The Crux**

The classic model (**1 Server $\rightarrow$ 1 DB**) works for thousands of users, but crashes under millions. System design is simply the art of **scaling** this basic client-server model using Load Balancers, Caches, and CDNs so it doesn't break.

---

### **The Reality Check (Scale Gap)**

* **Single Server Limits:** Can only handle ~1,000 to 5,000 requests per second (RPS).
* **YouTube Scale:** Handles **500,000+ RPS** and 500+ hours of video uploads per minute.
* **The Math:** A single top-tier server can only handle about **0.1%** of YouTube-level traffic.

---

### **How System Design Fixes It (The Toolkit)**

Instead of changing the model, we scale it:

* **Load Balancers:** Spread the millions of clients across *multiple* servers.
* **Databases:** Separated from app servers so they don't fight for RAM/Storage.
* **Caches & CDNs:** Save the server from doing the same work twice by storing data closer to the user.