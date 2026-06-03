# DNS in System Design

DNS is not just for translating names to IP addresses. It is the first layer of traffic routing.

## Uses of DNS
### 1. Global Load Balancing

DNS can return different IP addresses based on user location.

```text
India  → Mumbai DC
USA    → Iowa DC
Europe → Belgium DC
```

Same domain, different servers.

**Purpose:** Route users to the nearest data center.
---

### 2. Failover
```text
Normal:
youtube.com → Primary Server

Primary fails
↓
DNS updated

youtube.com → Backup Server
```

#### TTL Tradeoff

- Low TTL → Faster failover, more DNS queries
- High TTL → Fewer DNS queries, slower failover

---

### 3. CDN Integration

```text
youtube.com
      ↓
cdn.youtube.com
      ↓
Nearest CDN Edge Server
```

Users receive content from nearby CDN servers instead of the origin server.

---

## Key Takeaways

- DNS provides the first layer of load balancing.
- DNS helps with failover and high availability.
- DNS integrates with CDNs for faster content delivery.
- DNS changes are **not instant** because of TTL.
- Instant failover requires additional layers like load balancers and health checks.

---

> DNS = First layer of traffic routing.

**SECTION 4C - DNS in system design**

Why DNS Matters
DNS is not just for converting domain names to IP addresses. In system design, it is a powerful tool that helps with global traffic routing, load balancing, and making systems more reliable. It works as the first smart layer before your request even reaches the servers.
1- Global Load Balancing (GeoDNS)
DNS can send users to different servers based on their location.

User in India → Gets Mumbai data center IP
User in USA → Gets Iowa data center IP
User in Europe → Gets Belgium data center IP

This is called GeoDNS. It helps big companies like YouTube and Netflix show content from the nearest server, which makes websites faster.

2- Failover and High Availability
DNS can help switch traffic when a server fails.

Normally, users go to the main (primary) server.
If the main server goes down, DNS is updated to point to the backup server.
Once the main server is fixed, DNS points back to it.

TTL Trade-off:

Low TTL (e.g., 60 seconds) → Faster switch to backup, but more DNS queries.
High TTL (e.g., 3600 seconds) → Fewer queries, but slower to switch during failure.

3- CDN Integration
DNS helps connect to Content Delivery Networks (CDNs).

Example: youtube.com → Points to cdn.youtube.com (using CNAME)
DNS then resolves to the nearest CDN edge server (like Cloudflare or Akamai).

This way, users don’t go all the way to YouTube’s main server — they get content from a nearby CDN server.
Interview Tip
When asked about global traffic or failover, say: “We can use DNS-based load balancing as the first and cheapest layer.” It works before the request even touches your infrastructure.
Important Point to Remember
DNS is not instant. Changes take time (minutes to hours) because of caching and TTL. For super-fast failover, you need extra tools like load balancers and health checks.