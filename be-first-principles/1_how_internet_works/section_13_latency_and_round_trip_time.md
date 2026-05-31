**SECTION 13: Latency and Round-Trip Time**


What is Latency and RTT?
Latency is the time taken for data to travel from one point to another. Round-Trip Time (RTT) is the total time for a request to go to the server and the response to come back.

Speed of Light Sets the Floor: Speed of light in fiber optic cable: ~200,000 km/s (⅔ speed of light in vacuum)

| Distance                  | One-Way Time | Round-Trip Time |
|---------------------------|--------------|-----------------|
| Mumbai to Mumbai          | 0.05ms       | 0.1ms           |
| Mumbai to Singapore       | 20ms         | 40ms            |
| Mumbai to London          | 36ms         | 72ms            |
| Mumbai to San Francisco   | 68ms         | 136ms           |

Note: Real-world RTT is usually 2-5x higher due to routing and network hops.

Real-World Latency Measurements

| Operation                    | Typical Latency      |
|------------------------------|----------------------|
| L1 cache read (CPU)          | 0.5 ns               |
| RAM access                   | 100 ns               |
| SSD read                     | 150,000 ns           |
| HDD read                     | 10,000,000 ns        |
| Same data center round trip  | 0.5 ms               |
| Same continent round trip    | 50-100 ms            |
| Cross-continent round trip   | 100-300 ms           |
| DNS lookup (uncached)        | 20-100 ms            |
| TLS handshake                | 50-150 ms            |

Why This Matters in System Design
The difference between RAM and disk is huge (100,000x slower). This is why caching is extremely important - it moves operations from slow disk to fast memory or cache.

Latency Budget Example (YouTube Homepage under 500ms)

- DNS: 0ms (cached)
- TCP + TLS: 50ms
- Server processing: 100ms
- Network transit: 100ms
- Browser rendering: 200ms
- Buffer: 50ms

Total: 500ms

If server processing increases to 300ms, the entire budget is broken. This is why performance optimization and caching decisions are critical.