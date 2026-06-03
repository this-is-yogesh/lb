# TCP (Transmission Control Protocol)

TCP is a transport protocol that prioritizes **reliability**.

Before sending data, TCP establishes a connection between the client and server.

## TCP Connection Setup

### Three-Way Handshake

```text
Client → Server : SYN
Server → Client : SYN-ACK
Client → Server : ACK

Connection Established
```

Only after this handshake can data be transmitted.

### Cost

- Extra latency before data transfer
- Multiple acknowledgements
- Retransmission of lost packets
- Additional protocol overhead

---

## TCP Guarantees

### 1. Ordered Delivery

Packets arrive in the same order they were sent.

```text
Sent:     A → B → C
Received: A → B → C
```

---

### 2. Reliable Delivery

If a packet is lost, TCP automatically retransmits it.

```text
A → B → X → D

Packet C lost
↓
TCP retransmits C
↓
A → B → C → D
```

---

### 3. Error Detection

Corrupted packets are detected and resent.

---

### 4. Flow Control

If the receiver is slow, TCP reduces the sending rate.

```text
Fast Sender
     ↓
Slow Receiver

TCP slows down transmission
```

---

### 5. Congestion Control

If the network is congested, TCP reduces traffic to avoid overload.

---

## Why TCP Exists

TCP ensures:

- Data is not lost
- Data arrives in order
- Data is not corrupted

This makes it ideal for:

- Web browsing
- APIs
- Banking systems
- Database communication
- File downloads

---

## Limitation

Reliability comes at the cost of speed.
For real-time applications (video calls, gaming), an old packet is often useless.

Example:

```text
Video frame lost
↓
TCP retransmits after delay
↓
Frame arrives 2 seconds later
↓
Too late to be useful
```

In such cases, speed is more important than perfect reliability.

---

> TCP = Reliable, Ordered, Connection-Oriented Communication

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