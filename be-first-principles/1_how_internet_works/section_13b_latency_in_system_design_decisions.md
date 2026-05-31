**SECTION 13B - Latency in System Design Decisions**

How Latency Shapes Architecture
Every major system design decision is mainly about reducing latency.

Components and Latency Problems They Solve

| Component           | Latency Problem It Solves       | How |
|---------------------|---------------------------------|-----|
| CDN                 | Cross-continent network latency | Serve content from edge server near user |
| Cache (Redis)       | Database query latency          | Serve data from RAM instead of disk |
| Read replicas       | Database overload latency       | Distribute read queries across multiple copies |
| Load balancer       | Single server overload latency  | Distribute traffic across many servers |
| Sharding            | Large table scan latency        | Break big tables into smaller ones |
| Async processing    | Long operation blocking user    | Return response immediately, process later |
| Connection pooling  | TCP/TLS handshake latency       | Reuse existing connections |

The Latency Hierarchy (Fastest to Slowest)

| Level                              | Typical Latency     |
|------------------------------------|---------------------|
| In-memory (application cache)      | ~1 μs               |
| In-memory (Redis, same DC)         | ~500 μs             |
| SSD with index hit                 | ~1 ms               |
| SSD with full scan                 | ~10-100 ms          |
| Cross-service call (same region)   | ~5-50 ms            |
| Cross-region call                  | ~50-200 ms          |
| External API call                  | ~100-500 ms         |
| Large disk-based operations        | ~1-10 seconds       |

System design goal is to keep most operations as high as possible in this hierarchy.

Interview Tip
When discussing performance, use specific numbers. Instead of saying caching makes it faster, say a Redis cache hit takes ~500 microseconds compared to ~10 milliseconds for a database query - a 20x improvement.