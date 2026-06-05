Here is the ultra-short, crisp revision summary.

---

### **The Crux**

To talk to a backend service, you need two things: **IP Address** (which machine) + **Port Number** (which application on that machine).

$$\text{Full Network Address} = \text{IP Address (Building)} + \text{Port Number (Apartment Number)}$$

---

### **1. IP Address (The Building)**

Identifies the specific machine on the internet.

* **IPv4:** Old format (`142.250.80.46`). Only 4.3 billion slots; we are running out.
* **IPv6:** New massive format (`2607:f8b0...`). Provides virtually infinite addresses.

---

### **2. Port Number (The Apartment Door)**

Tells the server's OS exactly which software application should open and read the incoming data.

| Port | Service / Protocol | What it’s used for |
| --- | --- | --- |
| **80** | HTTP | Unencrypted web traffic |
| **443** | HTTPS | Encrypted web traffic (Standard) |
| **22** | SSH | Secure remote terminal access |
| **5432** | PostgreSQL | Database traffic |
| **6379** | Redis | Cache traffic |

---

### **System Design Blueprint**

When your browser hits a secure site, it targets `IP:443`. In your microservices architecture diagrams, every database, cache, and API container will listen on these specific, dedicated ports to keep traffic separated.