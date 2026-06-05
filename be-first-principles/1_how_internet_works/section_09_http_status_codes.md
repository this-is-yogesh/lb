Here is the ultra-short, crisp revision summary for HTTP Status Codes.

---

### **The Crux**

Status codes are the **standard language** servers use to tell clients exactly what happened to their request. In system design, specific codes act as diagnostic health flags across your microservices.

---

### **The 5 Main Brackets**

* **`2xx` (Success):** Everything worked.
* **`3xx` (Redirection):** Go look somewhere else.
* **`4xx` (Client Error):** The client messed up (bad data, no auth).
* **`5xx` (Server Error):** The server messed up (crash, timeout).

---

### **System Design Cheat Sheet: Core Codes**

| Code | Name | Why It Matters in System Design |
| --- | --- | --- |
| **`201`** | Created | Returned after a successful `POST` request. |
| **`202`** | Accepted | The request is queued for **asynchronous processing** (heavy background jobs). |
| **`301/302`** | Redirects | The foundation of **URL Shorteners** (TinyURL). |
| **`304`** | Not Modified | Tells the client to use its **local cache** instead of downloading data again. |
| **`409`** | Conflict | Prevents duplicate states (e.g., two users trying to claim the same username). |
| **`429`** | Too Many Requests | **Rate Limiter** is actively working to block a DDoS or spam attack. |

---

### **Microservice Debugging Blueprint**

When a system fails, the specific `5xx` code tells you exactly *where* it broke:

* **`502 Bad Gateway` / `504 Gateway Timeout`:** The API Gateway/Load Balancer timed out waiting for the downstream microservice to reply. (Service is dead or lagging).
* **`503 Service Unavailable`:** The server is protecting itself. A **Circuit Breaker** tripped, or the server is shedding load because it's maxed out.

---

### **Interview Golden Rule**

Never just say *"it returns an error."* Be precise.

> *Example:* "If a user registers, my API returns **`201 Created`** on success, **`409 Conflict`** if the email is taken, and **`429 Too Many Requests`** if they hit the registration endpoint too fast."