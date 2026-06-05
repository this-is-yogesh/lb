````md id="8tmx4w"
Here is the ultra-short, crisp revision summary for Reverse Proxies.

---

### **The Crux**

A **Reverse Proxy** is the server-side gatekeeper. It intercepts all incoming client requests and routes them to your backend servers. The client **never** talks directly to your application servers, which completely hides your backend infrastructure from the public internet.

---

### **Core Capabilities**

- **Security:** Shields your backend server IP addresses from attackers.
- **TLS Termination:** Decrypts HTTPS traffic at the edge so your app servers don't waste CPU power.
- **Caching & Compression:** Caches static pages and compresses text sizes (gzip/brotli) to reduce backend stress.
- **Load Distribution & Rate Limiting:** Evenly splits incoming traffic across servers and blocks malicious, high-speed spammers.

---

### **Forward Proxy vs. Reverse Proxy**

- **Forward Proxy (Client Guard):** Sits in front of the **client** to hide the client's identity or filter out bad websites (e.g., Corporate VPNs, School internet blockers).

```text
Client
    ↓
Forward Proxy
    ↓
Internet
    ↓
Destination Server
```

- **Reverse Proxy (Server Guard):** Sits in front of the **backend servers** to hide the inner network architecture and protect the system data.

```text
Client
    ↓
Internet
    ↓
Reverse Proxy
    ↓
Internal Backend Servers
```

---

### **Technology Cheat Sheet**

- **Nginx:** The standard production default. Incredible performance and minimal memory usage.
- **HAProxy:** Pick this for advanced, complex load balancing logic.
- **Cloudflare:** A fully managed, cloud-based CDN and reverse proxy combined.

**Daily Revision Trigger:** *If an interviewer asks how to secure an application from direct public exposure while optimizing network overhead, a reverse proxy (like Nginx) is always your opening answer.*
````
