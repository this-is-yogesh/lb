# Complete Request-Response Lifecycle

A request goes through several stages before data appears on the user's screen.

## End-to-End Flow

```text
User
 ↓
DNS Resolution
 ↓
TCP Handshake
 ↓
TLS Handshake
 ↓
HTTP Request
 ↓
Load Balancer
 ↓
Application Server
 ↓
Database / Cache / CDN
 ↓
HTTP Response
 ↓
User
```

---

## Request Journey

### 1. DNS Resolution

Convert domain name to IP address.

```text
youtube.com
     ↓
142.250.80.46
```

---

### 2. TCP Handshake

Establish a reliable connection.

```text
SYN
↓
SYN-ACK
↓
ACK
```

---

### 3. TLS Handshake

Negotiate encryption for HTTPS communication.

---

### 4. HTTP Request

Client sends:

- Method
- URL
- Headers
- Body

---

### 5. Server Processing

Request may pass through:

```text
Load Balancer
      ↓
Application Server
      ↓
Cache / Database / Object Storage
```

The server processes the request and generates a response.

---

### 6. HTTP Response

Server returns:

- Status code
- Headers
- Response body

---

## Typical Latency Contributors

| Component | Typical Time |
|------------|--------------|
| DNS Resolution | 0-50 ms |
| TCP Handshake | 20-50 ms |
| TLS Handshake | 50-150 ms |
| Network Transit | 10-100 ms |
| Server Processing | 10-200 ms |
| Response Transit | 10-100 ms |

**Total:** ~100–650 ms

---

## What Dominates Latency?

### Small-scale systems

```text
Server Processing Time
```

is usually the bottleneck.

---

### Global systems

```text
Network Latency
```

becomes the bottleneck because physical distance matters.

This is why CDNs exist.

```text
User
 ↓
Nearby CDN
 ↓
Faster Response
```

instead of

```text
User
 ↓
Server 10,000 km away
 ↓
Slower Response
```

---

## Key Takeaway

> Most of the perceived speed of an application comes from reducing latency, not increasing CPU power.

```text
User
↓
DNS
↓
TCP
↓
TLS
↓
HTTP
↓
Load Balancer
↓
Application Server
↓
Database / Cache / CDN
↓
Response
↓
User
```
**SECTION 11- Request-Response Lifecycle**

Complete Request-Response Lifecycle
This combines all previous concepts to show the full journey of an HTTP request from client to server and back.


REFER to image req-resp-lifecycle.png

Time Breakdown for a Typical Request

| Step                | Action                                      | Time            |
|---------------------|---------------------------------------------|-----------------|
| DNS resolution      | Look up IP address                          | 0-50ms (usually cached) |
| TCP handshake       | Establish connection                        | 20-50ms         |
| TLS handshake       | Negotiate encryption                        | 50-150ms        |
| Request transit     | Data travels from client to server          | 10-100ms        |
| Server processing   | Application logic + database queries        | 10-200ms        |
| Response transit    | Data travels from server to client          | 10-100ms        |
| Total               |                                             | 100-650ms       |

What Dominates Latency
- At small scale: Server processing time is the biggest factor
- At global scale: Network latency (physical distance between user and server) dominates

This is why CDNs are important - they serve content from a server physically close to the user, which greatly reduces latency.