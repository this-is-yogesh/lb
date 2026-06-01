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