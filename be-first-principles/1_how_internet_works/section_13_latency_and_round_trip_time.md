Here is the ultra-short, crisp revision summary for Latency and RTT.

---

### **The Crux**

You cannot beat the speed of light. Because physical distance dictates network lag, system design focuses on **caching** (RAM vs. Disk) and **proximity** (CDNs) to stay within a strict **Latency Budget**.

---

### **The "Why Caching Works" Math**

The speed difference between reading from memory (RAM) and reading from a hard drive (Disk) is **five orders of magnitude**.

- **RAM Access:** 100 ns
- **Same Data Center Cache (Redis):** 500,000 ns
- **Disk Read (HDD):** 10,000,000 ns (**100,000× slower than RAM!**)

> **Takeaway:** Moving data from Disk to a RAM-based Cache completely changes the time scale of your system.

---

### **The Distance Penalty (Theoretical vs. Real RTT)**

The further data has to travel through fiber optic cables, the higher the Round-Trip Time (RTT):

- **Mumbai ↔ Singapore:** ~40 ms
- **Mumbai ↔ San Francisco:** ~136 ms
- *Note: Real-world RTT is actually **2–5× higher** due to network hops and routing.*

---

### **The Latency Budget (Target: <500 ms Homepage Load)**

Every millisecond counts. In an interview, break down your performance budget like this:

```text
Connection (50 ms)
+ Server Code (100 ms)
+ Network Transit (100 ms)
+ Browser Render (200 ms)
--------------------------------
= 450 ms
```

**Daily Revision Trigger:** *If your database query takes 300 ms, you have already blown your entire latency budget before the user's browser even attempts to draw the screen.*