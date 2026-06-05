Here is the ultra-short, crisp revision summary for Single Server Architecture.

---

### **The Crux**

Single Server Architecture puts your **Web Server, App Code, and Database on one single machine**. While cheap and simple for prototypes, it establishes a massive **Single Point of Failure (SPOF)**—if any single component maxes out or crashes, your entire business goes offline.

---

Refer to image single_server_architecture.jpg
### **The All-in-One Component Stack**

- **1. Web Server (Nginx/Apache - Port 80/443):** Handles incoming client traffic and serves static files.
- **2. App Code (Node.js/Django - Port 3000/8080):** Handles the core business logic and APIs.
- **3. Database (PostgreSQL/MySQL - Port 5432/3306):** Saves data directly onto the local machine's hard drive.

---

### **The Breaking Thresholds Cheat Sheet**

| Resource | What Causes It to Break | System Symptom |
| --- | --- | --- |
| **CPU** | Complex computations or massive requests. | Requests queue up, causing severe response lag (>70% utilization). |
| **Memory** | Too many concurrent connections or huge data payloads. | Out-of-Memory (OOM) error crashes the server (>90% RAM usage). |
| **Disk I/O** | High-volume database reads/writes fighting for the hard drive. | Queries bottleneck, causing latency to spike from milliseconds to seconds. |
| **Network** | Heavy media downloads or high raw traffic. | Packet loss and client-side connection timeouts (>80% bandwidth usage). |

---

### **The Golden Rule of Scaling**

```text
Single Server (All-in-One)
            ↓
Step 1: Separate the DB onto its own machine
```

**Daily Revision Trigger:** *Never stick with a single server if you have team coordination needs, a dataset growing past 10 GB, or traffic crossing 1,000 daily active users.*