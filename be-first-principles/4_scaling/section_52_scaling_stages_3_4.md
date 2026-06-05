
Here is the ultra-short, crisp revision summary for Scaling Stages 3–4 (10K–1M Users).

---

### **The Crux**

Moving from 10,000 to 1 million users requires moving away from single points of failure. You first scale your compute tier horizontally by using a load balancer and stateless servers. Once your database becomes a bottleneck due to high read volumes, you scale your data tier horizontally by using read replicas.

---

### **The Mid-Tier Architecture Evolution**

#### **Stage 3: The Load-Balanced Fleet (10K–100K Users)**

- **The Topology:** A **Load Balancer** acts as the public entry point, distributing incoming traffic across multiple parallel application servers.

- **The Scale Requirements:**
  - *Capacity:* Handles ~5,000–15,000 requests per second.
  - *Cost:* ~$500–$1,500/month depending on the fleet size.
  - *The Shift:* Application servers **must be stateless**. Active user sessions and files are moved to external tiers (like Redis and S3) so any server can fulfill any request. If one node crashes, the load balancer routes around it seamlessly.
  - *The Bottleneck:* **The Single Database.** The centralized database server is now forced to process every single read and write query, driving disk I/O and CPU to saturation.

---

#### **Stage 4: Data Tier Split (100K–1M Users)**

- **The Topology:** You deploy a **Primary-Replica Database Architecture**.

- **The Scale Requirements:**
  - *Capacity:* Handles ~15,000–50,000 requests per second.
  - *Cost:* ~$2,000–$5,000/month due to multiple database instances.
  - *The Optimization:* Relational database workloads are highly uneven, often consisting of 80–95% reads. By shifting all `SELECT` queries to a pool of horizontal **Read Replicas**, the **Primary DB** is insulated and left with plenty of headroom to handle only writes (`INSERT`/`UPDATE`).
  - *The Bottleneck:* **Database IOPS Saturation.** Even with replicas, repeatedly hitting spinning disks or SSDs for identical, frequently accessed data (like a celebrity profile or site settings) introduces latency and wastes database capacity.

---

### **The Migration Execution Path**

```text
Single App Node SPOF
          ↓
Add Load Balancer + Stateless Fleet
          ↓
Database Saturation
          ↓
Deploy Read Replicas
```

---

*Would you like to move directly into **Stage 5 (1M–10M Users)** to see how we deploy a Redis caching layer and an edge CDN to shield the database entirely?*
````
