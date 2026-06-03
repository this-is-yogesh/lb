# IP Addresses and Ports

To establish a connection, we need:

1. **IP Address** → Which machine?
2. **Port Number** → Which application on that machine?

## IP Address
An IP address uniquely identifies a machine on the internet.

- **IPv4**: ~4.3 billion addresses
- **IPv6**: Vastly larger address space

Most systems support both IPv4 and IPv6.

### Analogy

> IP Address = Building Address

---

## Port Number

A machine can run multiple applications simultaneously.
Ports tell the operating system which application should receive the request.

### Common Ports

| Port | Service |
|--------|---------|
| 80 | HTTP |
| 443 | HTTPS |
| 22 | SSH |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 3306 | MySQL |
| 27017 | MongoDB |

### Analogy

> Port = Apartment Number

---

## Putting It Together

When you open YouTube:

```text
youtube.com
      ↓
DNS
      ↓
142.250.80.46
      ↓
142.250.80.46:443
```

```text
IP Address + Port
```

is the complete destination.

### Analogy

```text
Building Address + Apartment Number
```

---

## System Design Relevance

Multiple services can run on the same machine, each listening on a different port.

Examples:

- PostgreSQL → Port 5432
- Redis → Port 6379
- MySQL → Port 3306

This allows different applications to coexist and communicate independently.

---

> IP identifies the machine; Port identifies the service running on that machine.


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