
Here is the ultra-short, crisp revision summary for the SQL vs. NoSQL Decision Framework.

---

### **The Crux**

Never say "NoSQL is better than SQL." In system design interviews, your database choice must be a direct mathematical response to your **system access patterns**, **write throughput volumes**, and **data structures**.

---

### **The Two-Way Selection Engine**

#### **Choose SQL When:**

- Data points are highly interconnected (e.g., Users → Orders → Payments).
- The business logic demands bulletproof multi-record **ACID transactions**.
- The core features rely on deep, multi-table `JOIN` operations and aggregations.
- The data schema is stable, uniform, and well-defined upfront.

#### **Choose NoSQL When:**

- Data access patterns are simple, localized, and key-based (e.g., fetch by ID).
- Raw write throughput is massive (**100K+ writes/sec**).
- The schema is highly dynamic, nested, or changes on a per-record basis.
- Native horizontal scale-out is required without the operational headache of manual sharding.

---

### **The Real-World System Mapping Architecture**

Use these exact pairings during system design mock interviews to justify your storage tier choices:

| System Component | Recommended Database Type | The Exact Production Reasoning |
| --- | --- | --- |
| **Social Core** (Posts, Follows) | **PostgreSQL (SQL)** | Relational dependencies; requires structured consistency to map social graphs and profiles. |
| **Active Shopping Cart** | **Redis (Key-Value)** | Volatile data, sub-millisecond retrieval speeds, and automatic node cleanups via TTL expiry. |
| **Chat Messages** (WhatsApp) | **Cassandra (Wide-Column)** | High-frequency write-heavy workloads; naturally partitioned by `conversation_id`. |
| **Product Catalogs** (Amazon) | **MongoDB (Document)** | Handles wildly varying metadata attributes per product category in nested JSON structures. |
| **Social Graph Traversals** | **Neo4j / TAO (Graph)** | Explicitly optimized for rapid, multi-hop relationship lookups (e.g., "Friends of Friends"). |
| **Analytics Event Tracking** | **Cassandra / ClickHouse** | High-volume, append-only, time-series data streams. |

---

### **Fast Revision Pipeline**

```text
Ledgers / Joins / Integrity
            ↓
PostgreSQL


Massive Appends / Time-Series
            ↓
Cassandra


High-Speed Caching / Rate Limits
            ↓
Redis


Polymorphic JSON / Catalogs
            ↓
MongoDB
```

---

*Would you like to move directly into **Database Normalization vs. Denormalization** mechanics, or run through a mock scenario practicing this decision framework?*
````
