
Here is your ultra-short, crisp, high-yield final cheat sheet for the Databases section.

---

## **The Master Mind-Map**

### **The Core Concepts in One Sentence**

- **SQL (Relational):** Fixed table structures built on absolute ACID integrity and native `JOIN` processing.
- **Schema Design:** Hard enforcement of strong data types, primary keys, and foreign keys.
- **Indexes:** Multi-tier B-Trees that accelerate reads by up to **100,000×** at the cost of synchronous write speed.
- **ACID Guarantees:** Strict transaction bounds ensuring data transitions are all-or-nothing, rule-compliant, isolated, and crash-proof.
- **Key-Value Stores:** High-speed in-memory or SSD-bound distributed hash maps for sessions and caching.
- **Document Stores:** Hierarchical JSON/BSON repositories optimized for flexible schemas and self-contained entities.
- **Wide-Column Stores:** Append-only, partitioned storage optimized for massive time-series or IoT write throughput.
- **Normalization (3NF):** Splitting tables to ensure every piece of data lives in exactly one spot on disk.
- **Denormalization:** Deliberately duplicating or pre-computing fields to eliminate heavy aggregate operations.
- **Replication:** Cloning datasets to multiple hosts to scale read throughput and eliminate single points of failure.
- **Replication Lag:** Network transit delay that requires temporary user-pinned routing to the Primary node.
- **Sharding:** Horizontally partitioning a massive table across separate physical server instances.
- **Shard Keys:** Crucial routing anchors using either uniform hash-modulo patterns or sequential range blocks.

---

## **The System Design Back-of-the-Envelope Numbers**

| Metric / Boundary | The Production Limit / Performance Metric |
| --- | --- |
| **B-Tree Index Lookup** | `O(log n)` algorithmic time → **< 1 ms** even across billions of rows. |
| **Sequential Table Scan** | `O(n)` algorithmic time → **Seconds to minutes** at production scale. |
| **Single PostgreSQL Host** | Maxes out around **~10,000 QPS** and **10–16 TB** of disk space. |
| **Single Redis Node** | **~0.1–0.5 ms** execution latency → **100K–500K ops/sec** in RAM. |
| **Asynchronous Replication Lag** | Standard network propagation delay of **100–500 ms**. |
| **Target Shard Footprint** | Optimally holds **~2 Million active user segments** per instance. |

---

## **The 7 Interview Pitfalls & Immediate Technical Fixes**

### **1. Vagueness Trap**

- ❌ *"I'll just throw this data into a database."*

- ✅ *"I will select **PostgreSQL** here because our schema requires structured multi-table joins and absolute ACID reliability across user payment profiles."*

---

### **2. Naked Schemas**

- ❌ Designing tables and moving on.

- ✅ Always explicitly state:

> *"I am adding a secondary index to the `email` column to optimize the login lookup path from a full table scan down to an `O(log n)` lookup."*

---

### **3. Buzzword Justification**

- ❌ *"We should use NoSQL here because it is faster and scales better."*

- ✅ *"We will leverage **Cassandra** because our logging data pattern is extreme write-heavy (100K+ writes/sec) and naturally partitions cleanly by `device_id`."*

---

### **4. Monolithic Thinking**

- ❌ Forgetting scale-out mechanisms when designing for millions of users.

- ✅ Proactively introduce **Read Replicas** for high read volumes and **Hash-Based Sharding** when storage size breaches the **10 TB** single-node threshold.

---

### **5. File Abuse**

- ❌ Storing high-resolution user photos or binary videos inside a SQL `BLOB` column.

- ✅ Always stream assets directly to object storage (like **AWS S3** or **Google Cloud Storage**) and keep only the metadata URL string inside the database.

---

### **6. SQL Array Anti-Pattern**

- ❌ Storing an array of strings directly inside a single SQL table cell.

- ✅ Enforce 1NF by stripping out arrays and building a clean, indexed **Junction Table** to handle many-to-many relationships.

---

### **7. Shard Key Blindness**

- ❌ Proposing a shard key without addressing its cross-shard query performance.

- ✅ Acknowledge that picking a non-optimal key forces a painful scatter-gather lookup, and immediately solve it by proposing an application-level **Redis lookup cache**.

---

### **Fast Recall Pipeline**

```text
Structured Data + ACID + JOINs
                ↓
             PostgreSQL


Sub-ms Cache + Sessions
                ↓
               Redis


Flexible JSON Documents
                ↓
              MongoDB


Massive Time-Series Writes
                ↓
             Cassandra


Read Bottleneck
                ↓
            Replication


Storage / Write Bottleneck
                ↓
             Sharding
```

---

*Congratulations on wrapping up the Database section! Would you like to transition directly into the next system design module, or run a fast, comprehensive mock interview scenario utilizing these database principles?*
````
