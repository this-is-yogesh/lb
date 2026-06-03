# Section 2: How the Internet Works

Before designing systems, we must understand how data moves between machines. Almost every application—chat apps, video platforms, payment systems, etc.—uses the same underlying concepts.

## Topics Covered
- Client-Server Model
- DNS
- IP Addresses and Ports
- TCP and UDP
- HTTP and HTTPS
- Request-Response Lifecycle
- Latency and Round-Trip Time (RTT)

## Why This Matters
These concepts directly affect:
- Scalability
- Performance
- Reliability
- API design
- Caching
- Server placement

## The Big Question

When you tap a YouTube video, how does it reach your screen?

The request travels through multiple layers:

User
→ DNS
→ TCP/TLS
→ HTTP Request
→ Load Balancer
→ Application Server
→ Database/CDN
→ Response

Understanding this journey is the foundation of System Design.




**Section 2: The Life of a Web Request**

Before designing complex systems, it is important to understand how the internet moves data between machines. Every system (chat app, video platform, payment service) relies on the same core mechanics.

What We Will Cover

1. Client-Server Model
2. DNS (Domain Name System)
3. IP Addresses and Ports
4. TCP and UDP
5. HTTP and HTTPS
6. Complete Request-Response Lifecycle
7. Latency and Round-Trip Time

Why This Matters for System Design

| Concept       | Where It Shows Up in Design |
|---------------|-----------------------------|
| DNS           | CDN routing, global load balancing, failover strategies |
| TCP vs UDP    | Choosing protocols for chat, video streaming, gaming |
| HTTP/HTTPS    | API design, REST endpoints, status codes |
| Latency       | Performance budgets, caching decisions, server placement |

The Key Question
When you open YouTube on your phone and a video starts playing, what actually happens between tapping the screen and seeing the video?

This journey involves:
- DNS resolution
- TCP connections
- TLS handshakes
- HTTP requests
- Load balancers
- Application servers
- Databases
- CDNs
- Object storage

We will trace this complete journey step by step.