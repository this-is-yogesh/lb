Here is the ultra-short, crisp revision summary.

---

### **The Crux**

DNS is the **first layer of routing** in system design. It filters and routes global traffic *before* a request ever hits your servers, making it the cheapest way to handle scale.

---

### **The 3 Architecture Pillars**

* **1. GeoDNS (Global Routing):** Sends users to the closest data center based on their country.
* *India User -> Mumbai Server | US User -> Iowa Server.*


* **2. CDN Integration:** Connects domain names to Edge servers using **CNAME** records so static content loads instantly.
* **3. Failover (Backup Routing):** If the main server dies, DNS switches traffic to a backup server.

---

### **The Critical Trade-Off: TTL (Time to Live)**

* **Low TTL (e.g., 60s):** Fast backup switching, but floods servers with constant DNS lookups.
* **High TTL (e.g., 1hr):** Fewer lookups (faster for user), but very slow to switch if a server dies.

---

### **Interview Golden Rules**

* **First Line of Defense:** Always use DNS-based load balancing as your first answer for handling global traffic.
* **The Trap:** DNS is **not real-time**. Because of TTL caching, changes take minutes or hours to spread. You cannot rely on DNS *alone* for instant, seamless failover.