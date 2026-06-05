````md id="4kz7px"
Here is the ultra-short, crisp revision summary for Server Types.

---

### **The Crux**

In production, we split architecture into three distinct layers: **Web, Application, and Database**. Separating them means each layer can be tuned, optimized, and scaled independently without stepping on each other's resources.

---

### **The 3 Production Server Tiers**

#### **1. Web Server (Nginx, Apache)**

- **Role:** The front door. Handles HTTP connection plumbing, network overhead, and static assets.
- **Key Tasks:** Serves static files (`.js`, `.css`, images), handles **TLS termination**, compresses text, and acts as a proxy.
- **Performance:** High network efficiency; handles **10,000+** concurrent connections easily.

#### **2. Application Server (Node.js, Spring Boot, Django)**

- **Role:** The brain. Processes dynamic requests and enforces business rules.
- **Key Tasks:** Input validation, running app logic, checking user authentication, and formatting data responses (JSON/HTML).
- **Performance:** Bound by computation speed; typical responses take **10–200 ms**.

#### **3. Database Server (PostgreSQL, MongoDB, Redis)**

- **Role:** The memory. Persists, indexes, and organizes your data safely.
- **Key Tasks:** Running queries, managing data indexes, locking data for concurrent writes, and handling backups.
- **Performance:** Fast for indexed lookups (**<1 ms**), but slow for unindexed full table scans (**100 ms–10 s**).

---

### **The End-to-End Pipeline Matrix**

```text
Client Request (HTTPS:443)
            ↓
Web Server (Nginx)
[Decrypts TLS / Handles Static Files]
            ↓
App Server (Node.js)
[Validates Auth / Runs Logic]
            ↓
Database (Postgres)
[Fetches/Saves Data]
```

**Daily Revision Trigger:** *Web servers handle the network connections; App servers handle the brainpower; Databases handle disk storage. If traffic spikes, you can scale the web servers without touching the database.*
````
