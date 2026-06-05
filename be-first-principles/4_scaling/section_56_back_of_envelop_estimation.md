
Here is the ultra-short, crisp revision summary for Back-of-the-Envelope Capacity Estimation.

---

### **The Crux**

Back-of-the-envelope estimation is the art of using high-level mental math to convert abstract product metrics (e.g., "100 million active users") into concrete hardware specifications (servers, storage racks, cache arrays, and network pipes). Interviewers don't care about decimal precision; they want to see your logical framework and architectural reasoning.

---

### **The Big 4 Estimation Anchors**

- **1. QPS (Queries Per Second):** Determines your compute pool density, load balancer rules, and connection pool sizing.
- **2. Storage Capacity:** Outlines total disk space, dictates whether you can survive on a single node, and maps out your multi-year sharding timeline.
- **3. Bandwidth Intake/Outflow:** Uncovers networking bottlenecks, calculates outgoing data transit costs, and highlights exactly when a CDN is required to prevent server melt.
- **4. Memory (Cache Size):** Sets the physical hardware boundaries for your distributed in-memory **Redis** cluster to ensure hot data fits comfortably in RAM.

---

### **The 4 Non-Negotiable Interview Rules**

#### **Rule 1: Round Aggressively**

Never waste time doing long-form decimal division on a whiteboard.

```text
The Ultimate System Design Cheat:

1 Day = 86,400 seconds
      ≈
100,000 seconds
```

---

#### **Rule 2: Think Out Loud**

The absolute numerical answer is worthless without your context.

Explain *why* you are multiplying numbers together.

---

#### **Rule 3: Frame Your Assumptions Upfront**

Establish your base metrics before touching any numbers.

Example:

> *"Let's assume a standard 10:1 read-to-write ratio for this social platform, with a Daily Active User (DAU) footprint of 20%."*

---

#### **Rule 4: Standardize on Powers of 10**

Use the simplified data storage matrix for lightning-fast calculations:

| Metric Tier | Exact Value in Bytes | Power of 10 Equivalent | Quick Mental Translation |
| --- | --- | --- | --- |
| **1 KB** | 1,000 | 10³ | One short text paragraph |
| **1 MB** | 1,000,000 | 10⁶ | One standard profile image |
| **1 GB** | 1,000,000,000 | 10⁹ | One highly compressed video clip |
| **1 TB** | 1,000,000,000,000 | 10¹² | A small corporate database disk |
| **1 PB** | 1,000,000,000,000,000 | 10¹⁵ | Enterprise global storage lake |

---

### **Fast Revision Pipeline**

```text
Product DAU Input
          ↓
Apply Rounded Time Engine
(÷100,000)
          ↓
Core QPS
          ↓
Multiply by Payload Size
          ↓
Bandwidth / Storage
```

---

### **Mental Math Cheat Sheet**

```text
1 Day      ≈ 100,000 seconds
1 KB       ≈ 10³ bytes
1 MB       ≈ 10⁶ bytes
1 GB       ≈ 10⁹ bytes
1 TB       ≈ 10¹² bytes
1 PB       ≈ 10¹⁵ bytes


Users
  ↓
Requests
  ↓
QPS
  ↓
Payload Size
  ↓
Bandwidth + Storage
```

---

*Would you like to put this into practice by working through a fast, step-by-step math proof for a high-scale platform like Twitter or YouTube to calculate its QPS and daily storage?*
````
