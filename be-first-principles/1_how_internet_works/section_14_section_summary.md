Here is the ultra-short, crisp summary of the section wrap-up for your final daily revision layer.

---

### **The Crux**

Every single component in system design—from Load Balancers to Message Queues—exists purely to solve the networking, scalability, and latency limitations of the basic **Client-Server model**.

---

### **The Cheat Sheet: System Design Interdependence**

- **Servers & Scaling:** Solves the single-server bottleneck.
- **Databases & Caching:** Bridges the 100,000× speed gap between RAM (100 ns) and Disk (10 ms).
- **Load Balancers:** Distributes incoming raw **TCP** connections safely.
- **CDNs:** Defeats cross-continent network transit lag (100–300 ms) by moving data closer to the user.
- **Queues:** Shifts heavy tasks to **Async Processing** so the client gets an immediate response.
- **APIs:** Standardizes communication using clean **HTTP methods** and precise **Status Codes**.

---

### **Top 5 Interview Pitfalls to Avoid**

1. **Auth Confusion:** **`401`** means *Who are you?* (No valid login token). **`403`** means *I know who you are, but you don't have permission.*
2. **Ignoring Connection Overhead:** Always calculate the **TCP + TLS handshake latency** (~70–200 ms) into your initial connection budgets.
3. **Vague Latency Terms:** Never treat latency as a single static number. Discuss it as a distribution (**P50, P95, P99**).
4. **Wrong Protocol:** Default to **TCP** for safety/integrity (APIs, DBs); reserve **UDP** strictly for real-time speed (Live streaming, gaming).
5. **DNS Blindspot:** Remember that the very first cold request a client makes always pays an extra uncached **DNS lookup penalty** (20–100 ms).

---

### **Hard Numbers to Memorize**

```text
RAM Access (100 ns)
    ≪
SSD Read (150 μs)
    ≪
Same DC RTT (0.5 ms)
    ≪
HDD Read (10 ms)
    ≪
Cross-Continent RTT (100–300 ms)
```

Alternatively:

```text
RAM Access (100 ns)
≪ SSD Read (150 μs)
≪ Same DC RTT (0.5 ms)
≪ HDD Read (10 ms)
≪ Cross-Continent RTT (100–300 ms)
```