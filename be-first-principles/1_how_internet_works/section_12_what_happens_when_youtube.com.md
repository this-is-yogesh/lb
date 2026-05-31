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