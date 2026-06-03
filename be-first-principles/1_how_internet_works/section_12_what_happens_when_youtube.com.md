# What Happens When You Type youtube.com?

This question ties together all the networking concepts.

## End-to-End Flow

```text
User
 ↓
URL Parsing
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
Cache / Database
 ↓
HTTP Response
 ↓
Browser Rendering
 ↓
Page Becomes Interactive
```

---

## Step 1: URL Parsing

Browser extracts:

- Protocol → HTTPS
- Domain → youtube.com
- Port → 443

---

## Step 2: DNS Resolution

Convert domain name to IP address.

```text
Browser Cache
 ↓
OS Cache
 ↓
DNS Resolver
 ↓
Root Server
 ↓
TLD Server
 ↓
Authoritative DNS
 ↓
IP Address
```

---

## Step 3: TCP Handshake

Establish a reliable connection.

```text
SYN
↓
SYN-ACK
↓
ACK
```

Connection established.

---

## Step 4: TLS Handshake

Create an encrypted channel for HTTPS communication.

```text
Client Hello
↓
Server Certificate
↓
Key Exchange
↓
Secure Connection
```

---

## Step 5: HTTP Request

Browser sends:

```text
GET /
Host: youtube.com
Cookie: Session Data
```

---

## Step 6: Server Processing

```text
Load Balancer
      ↓
Application Server
      ↓
Cache / Database
```

Server:

- Validates user session
- Fetches recommendations
- Reads cache
- Queries database
- Generates HTML

---

## Step 7: HTTP Response

Server returns:

```text
200 OK
+ HTML
```

The HTML contains references to:

- CSS
- JavaScript
- Images
- Video thumbnails

---

## Step 8: Browser Rendering

Browser parses HTML and issues parallel requests for assets.

```text
HTML
 ↓
CSS
 ↓
JavaScript
 ↓
Images
 ↓
Fonts
```

Many of these assets are served from CDNs.

---

## Step 9: Page Becomes Interactive

Browser:

- Applies CSS
- Executes JavaScript
- Loads images

User can now interact with the page.

---

## Layers an Interviewer Expects

### Networking

- DNS
- TCP
- TLS
- HTTP

### System Design

- Load Balancer
- Application Server
- Database
- Cache
- CDN

### Browser

- Rendering
- Parallel asset requests

---

## Interview Answer Structure

When asked:

> "What happens when you type youtube.com?"

Start with:

```text
DNS
↓
TCP
↓
TLS
↓
HTTP Request
↓
Load Balancer
↓
Application Server
↓
Cache / Database
↓
HTTP Response
↓
Browser Rendering
```

Then dive deeper into any layer if needed.

---

## Key Takeaway

> Most web requests follow the same path:

```text
DNS
→ TCP
→ TLS
→ HTTP
→ Server Processing
→ Response
→ Rendering
```

Understanding these layers is the foundation of System Design.
**SECTION 12: What Happens When You Type youtube.com**

Full Journey: What Happens When You Type youtube.com
This is a very common interview question that covers DNS, TCP, TLS, HTTP, and more.

Step-by-Step Process

Step 1: URL Parsing
Browser parses youtube.com → Uses HTTPS protocol, Domain: youtube.com, Port: 443

Step 2: DNS Resolution (0-50ms)
Browser cache → OS cache → ISP resolver → Root server → .com TLD → YouTube's DNS server
Result: Gets IP address (e.g. 142.250.80.46)

Step 3: TCP Connection (20-50ms)
Three-way handshake (SYN, SYN-ACK, ACK)
Connection established to the server on port 443

Step 4: TLS Handshake (50-150ms)
Client and server negotiate encryption and exchange certificates
Secure encrypted channel is established

Step 5: HTTP Request
Browser sends GET request for the homepage with headers (cookies, accept type, etc.)

Step 6: Server-Side Processing (50-200ms)
Load balancer routes request to a healthy server
Server:
- Checks user session
- Fetches personalized data from database and cache
- Builds the HTML page

Step 7: HTTP Response
Server sends back HTML page with status 200 OK

Step 8: Browser Rendering
Browser parses HTML and makes additional requests for CSS, JavaScript, images (mostly from CDN)

Step 9: Page Becomes Interactive (Total 1-3 seconds)
Page is fully loaded and user can interact

What This Question Tests
This question checks your understanding of the full networking stack:
- DNS resolution
- TCP and TLS handshakes
- HTTP protocol
- Role of load balancers and CDNs
- Client-side rendering

Tip: Explain the flow layer by layer and offer to go deeper on any part if asked.