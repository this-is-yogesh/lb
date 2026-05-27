**SECTION 1. How the Internet Works**

Before we design systems, we need to understand how the internet actually moves data between machines. Every system you will ever design whether it’s a chat application, a video platform, or a payment service relies on the same underlying mechanics.

When you open YouTube on your phone and a video starts playing, what actually happened between you tapping the screen and pixels appearing? That journey involves DNS resolution, TCP connections, TLS handshakes, HTTP requests, load balancers, application servers, databases, CDNs, and object storage every component we’ll cover in this course.

**SECTION 2 - client server model**

The client-server model is the foundation of virtually every networked system. A client is any device or application that initiates a request. example of clients are user devices or apps like browsers, mobile apps, desktop apps, or even other servers calling APIs. A server is any machine that receives that request, processes it, and sends back a response.  Examples of Servers: Web server (Nginx, Apache) serves static files,Application server (Node.js, Django, Spring Boot) runs business logic,Database server (PostgreSQL, MySQL) stores and retrieves data

**SECTION 3 - client server model continued**

One server,many clients
At its simplest, a client-server system looks like this:
Millions of clients → 1 Server → 1 Database

Example:
- 1,000 users open youtube.com simultaneously
- All 1,000 requests go to the same server
- Server queries the database for each request
- Server sends back the response to each client

A single server handles roughly 0.1% of Big tech traffic.
The remaining 99.9% is what system design is about.

Every section builds on this model. Load balancers distribute clients across multiple servers. Databases move data off the application server. Caches reduce database load. CDNs serve content from locations closer to the client. The client-server model doesn’t change it scales.


**SECTION 4 - domain name system ( DNS )**

When you type youtube.com into your browser, your computer needs to find the IP address of YouTube’s server. Computers communicate using IP addresses (like 142.250.80.46), not human-readable domain names. DNS is the system that translates domain names to IP addresses.

Why Not Just Use IP Addresses Directly? := readibility - youtube.com is easier to remember than 142.250.80.46, youtube has hundred of servers dns can return any ip, dns can route users to nearest server geographically, Servers can move, infrastructure can changes and DNS absorbs this change

**SECTION 4B - DNS resolution**

DNS resolution is a hierarchical lookup process that converts a domain name (like youtube.com) into an IP address. It involves multiple levels, starting from local caches to global DNS servers. Each level either serves the answer from its cache or forwards the query to the next level.
Resolution Steps
When a browser needs to resolve a domain, it follows this flow:

Browser Cache — Checks its own recent cache first.
OS Cache — Then checks the operating system’s local DNS cache.
Recursive Resolver — Query is sent to the ISP’s recursive resolver.
Root Server — Resolver queries a Root Name Server, which directs it to the TLD (.com) server.
TLD Server — The .com server points to the domain’s authoritative nameserver (e.g., Google’s DNS).
Authoritative Server — The authoritative server returns the final IP address.

Caching & TTL
Every level caches the response based on the TTL (Time To Live) value. Higher TTL means longer caching and fewer lookups, but slower propagation of changes.

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

**SECTION 5 - IP Addresses and Ports**
What are IP Addresses and Ports?
After DNS gives the IP address of a server, your device needs two things to connect:

IP Address → Tells which machine to connect to.
Port Number → Tells which application/service on that machine to talk to.

IP Address (The Building Address)

An IP address uniquely identifies a device/machine on the internet.
IPv4: Example - 142.250.80.46 (Old format, only 4.3 billion addresses available).
IPv6: Example - 2607:f8b0:4004:800::200e (New format, huge number of addresses).

IPv4 is almost finished because we have too many devices. IPv6 was created to solve this, but most systems still use both.
Port Number (The Apartment Number)
One server can run many applications at the same time (like web server, database, cache, etc.).
The port number acts like an apartment number — it tells the server which application should handle the request.
Common Ports:

80 → HTTP (Normal web traffic)
443 → HTTPS (Secure/Encrypted web traffic)
22 → SSH (Remote login)
5432 → PostgreSQL (Database)
6379 → Redis (Cache)
3306 → MySQL (Database)

How It Works Together (Simple Example)
When you open YouTube:

DNS resolves youtube.com → 142.250.80.46
Browser connects to 142.250.80.46:443 (IP address + Port)

Just like: Building Address + Apartment Number
Why It Matters in System Design
In real systems, multiple services run on the same machine but on different ports. That’s why you see things like “Redis on port 6379” or “PostgreSQL on port 5432” in architecture diagrams. Ports help the server know where to send each request.

**SECTION 6 - TCP**

What are TCP and UDP?
After getting the IP address and port, we need a way to send data between client and server. TCP and UDP are the two main protocols that do this job, but they work very differently.

TCP (Transmission Control Protocol)
TCP is a reliable protocol. It makes sure data reaches the destination completely, in the correct order, and without any errors. It is used when accuracy is more important than speed.
How TCP Works
TCP is connection-oriented. Before sending any data, it sets up a connection using a Three-Way Handshake:

Client → Server: SYN (I want to connect)
Server → Client: SYN-ACK (Okay, I accept)
Client → Server: ACK (Connection established)

Only after this handshake can actual data be sent. This adds some delay (usually 50-150ms).
TCP Guarantees:

Data arrives in the same order it was sent
Lost packets are automatically retransmitted
Corrupted packets are detected and fixed
Flow control – slows down if the receiver is busy
Congestion control – slows down if the network is crowded

Cost / Disadvantages of TCP:

Extra overhead (20 bytes header per packet)
Needs acknowledgments for every packet
Handshake delay before data starts flowing
Retransmission of old data can be useless in real-time apps (like video calls or gaming)

Simple Example:
When you browse a website or use WhatsApp, TCP is used because you need all messages or webpage content to arrive correctly and in order.

**SECTION 6B - UDP and Protocol Selection**

UDP (User Datagram Protocol)

What is UDP? 
UDP is a fast but unreliable protocol. It is a “fire and forget” protocol — it sends data without checking whether it actually reaches the destination.

How UDP Works 
No connection is established (no handshake).  
Client simply sends the data packet to the server.  
No acknowledgment and no retransmission.  
If a packet is lost or arrives out of order, UDP does nothing. The application must handle it.

UDP Characteristics
Very fast (no handshake delay)
Minimal overhead (only 8-byte header)
No guarantee of delivery
No guarantee of packet order
No congestion control (can flood the network)

TCP vs UDP – When to Use Which?

| Use Case                  | Protocol | Reason |
|---------------------------|----------|--------|
| Web browsing, APIs        | TCP      | Needs complete and correct data |
| Database queries          | TCP      | Data must be accurate |
| File transfers            | TCP      | Every byte is important |
| Live video / Voice calls  | UDP      | Real-time is more important than perfection |
| Online Gaming             | UDP      | Low latency is critical |
| DNS lookups               | UDP      | Small & fast queries |

System Design Importance
In most system design interviews, you will use TCP (HTTP, gRPC, databases, etc.) because reliability is needed.  
Use UDP when designing:
- Live video or audio streaming
- Real-time multiplayer games
- IoT systems (sensors sending frequent small data)

Hybrid Approach*
- Pre-recorded video (YouTube, Netflix) → Uses TCP (with buffering)  
- Live video calls (Zoom) → Uses UDP (because delay feels bad)

Simple Rule:  
- Choose TCP when you need reliability.  
- Choose UDP when you need speed and can tolerate some data loss.

**SECTION 7 - HTTP and HTTPS**

What is HTTP?
HTTP (HyperText Transfer Protocol) is the main protocol used by web browsers and servers to communicate. It runs on top of TCP and defines how requests and responses are structured.

HTTP Request-Response Model
HTTP works in a simple request-response pattern:

Client Request includes:
- Method (GET, POST, PUT, DELETE)
- URL (which resource to access)
- Headers (metadata like authentication, content type)
- Body (data sent in POST/PUT requests)

Server Response includes:
- Status Code (200 OK, 404 Not Found, 500 Error)
- Headers (content type, caching info, cookies)
- Body (HTML, JSON, images, etc.)

Example: Loading a YouTube Video Page

Request:
GET /watch?v=dQw4w9WgXcQ HTTP/1.1
Host: youtube.com
Accept: text/html

Response:
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 256000

response : 
... YouTube page HTML ...

HTTP Versions

| Version   | Year | Key Feature                          |
|-----------|------|--------------------------------------|
| HTTP/1.0  | 1996 | One request per TCP connection       |
| HTTP/1.1  | 1997 | Keep-alive (reuse connection)        |
| HTTP/2    | 2015 | Multiplexing (multiple requests in parallel) |
| HTTP/3    | 2022 | Uses QUIC (UDP-based) for lower latency |

Most systems today use HTTP/1.1 or HTTP/2. HTTP/3 is growing in adoption.

HTTPS is HTTP with encryption (using TLS/SSL). It protects data in transit and is used by almost all modern websites for security.

**SECTION 8 - HTTP Methods**

What are HTTP Methods?
Each HTTP method tells the server what action the client wants to perform. Using the correct method is important because it affects caching, idempotency, and how proxies, CDNs, and load balancers handle the request.

Common HTTP Methods

| Method | Purpose                        | Idempotent? | Has Body? | Example |
|--------|--------------------------------|-------------|-----------|---------|
| GET    | Retrieve a resource            | Yes         | No        | GET /users/123 |
| POST   | Create a new resource          | No          | Yes       | POST /users |
| PUT    | Replace a resource entirely    | Yes         | Yes       | PUT /users/123 |
| PATCH  | Partially update a resource    | No          | Yes       | PATCH /users/123 |
| DELETE | Remove a resource              | Yes         | No        | DELETE /users/123 |

Idempotency Explained
Idempotent means calling the same operation multiple times gives the same result.

- GET, PUT, DELETE → Idempotent (safe to retry)
- POST, PATCH → Not idempotent (retrying can create duplicates)

Why Idempotency Matters in System Design
In real systems, network failures and retries are very common. 

If a user clicks "Submit Order" twice due to slow network:
- Using POST can create duplicate orders
- This causes problems like double charging

This is why payment systems (like Stripe) use idempotency keys with POST requests to prevent duplicates.

Common Interview Mistake
Using POST for everything (like POST /getUser or POST /deleteUser). 

Best practice: Use the correct HTTP method to show the action and the URL to identify the resource.