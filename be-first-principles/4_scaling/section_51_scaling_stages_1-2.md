
Here is the ultra-short, crisp revision summary for Scaling Stages 1–2 (0–10K Users).

---

### **The Crux**

At the start of any application's lifecycle, your primary goal is minimizing architectural complexity and financial burn. You transition from an all-in-one monolith to a split-tier architecture the exact moment your database engine begins competing with your application runtime for the same physical RAM and CPU cycles.

---

Refer to images scaling_stages_1 and 2

### **The Early Architecture Evolution**

#### **Stage 1: The All-In-One Box (0–100 Users)**

- **The Topology:** 100% of your stack—the web server, the application runtime (e.g., Node.js/Python), and the database (e.g., PostgreSQL)—runs on a **single physical machine**.

- **The Operational Limits:**
  - *Capacity:* Handles ~100–500 requests per second.
  - *Cost:* Low-end pricing (~$50–$100/month).
  - *The Bottleneck:* **Resource Contention.** Heavy API processing will starve the database of CPU, or a large database query will exhaust the memory, crashing your app. There is zero redundancy.

---

#### **Stage 2: The Two-Tier Split (100–10,000 Users)**

- **The Topology:** You extract the database and migrate it to its own isolated machine. The application server communicates with it over the internal private network.

- **The Operational Optimization:**
  - *Capacity:* Handles ~1,000–5,000 requests per second.
  - *Cost:* Moderate investment (~$150–$300/month for 2 distinct hosts).
  - *Independent Sizing:* You can now tune your machines individually. You give your application server a high-compute CPU profile and allocate a high-memory RAM profile to the database server to maximize its internal query caching layers.
  - *The Bottleneck:* **The Application Single Point of Failure.** You are still running a single app server. If its CPU hits 100% or the host goes down, your platform fails.

---

### **The Migration Execution Path**

```text
All-In-One Box
(✗ Resource Contention)
            ↓
Split Data to Isolated Node
            ↓
Two-Tier Architecture
(✗ Single App Server SPOF)
```

---

*Would you like to move directly into **Stage 3 (10K–100K Users)** to see how we introduce the Load Balancer and scale out the application tier horizontally?*
````
