**SECTION 14 - Section Summary: How the Internet Works**

Concepts Covered

| Concept       | One-Line Summary                              | System Design Relevance |
|---------------|-----------------------------------------------|-------------------------|
| Client-Server | Client requests, server responds              | Foundation of all networked systems |
| DNS           | Translates domain names to IP addresses       | GeoDNS for global routing,CDN integration, failover |
| IP + Port     | Machine address + application identifier      | Service discovery, multi-service deployment |
| TCP           | Reliable, ordered delivery with handshake     | Used for APIs, database connections, file transfers |
| UDP           | Fast, unreliable delivery without handshake   | Used for live video, voice calls, gaming |
| HTTP/HTTPS    | Application-layer request-response protocol   | API design, REST endpoints, status codes |
| TLS           | Encrypts communication between client and server | TLS termination at load balancer, mTLS for internal |
| Latency       | Time for data to travel between two points    | Drives caching, CDN, replication, and sharding decisions |

How These Concepts Connect to the Course

- Section 3 (Servers): Builds on client-server model, what happens inside the server
- Section 4 (Databases): The data layer that servers query (ports 5432, 3306, 6379)
- Section 5 (Scaling): Solving the "one server isn't enough" problem
- Section 6 (Caching): Solving the latency problem (RAM vs disk)
- Section 7 (Load Balancing): Distributing TCP connections across servers
- Section 8 (CDN): Solving cross-continent latency with edge servers
- Section 9 (Queues): Async processing to avoid making clients wait
- Section 10 (APIs): Designing HTTP endpoints with proper methods and status codes

Common Interview Mistakes
- Not knowing the difference between TCP and UDP or when to use each
- Confusing 401 (not authenticated) with 403 (not authorized)
- Forgetting that DNS resolution adds latency on first request
- Not considering TLS handshake cost in latency budgets
- Treating latency as one number instead of P50, P95, P99

Key Numbers to Remember

| Item                        | Typical Value       |
|-----------------------------|---------------------|
| DNS lookup (uncached)       | 20-100ms            |
| TCP handshake               | 20-50ms             |
| TLS handshake               | 50-150ms            |
| Same data center RTT        | ~0.5ms              |
| Same continent RTT          | 50-100ms            |
| Cross-continent RTT         | 100-300ms           |
| RAM access                  | 100 nanoseconds     |
| SSD read                    | 150 microseconds    |
| HDD read                    | 10 milliseconds     |