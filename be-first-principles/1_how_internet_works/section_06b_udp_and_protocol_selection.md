# UDP (User Datagram Protocol)

UDP is a transport protocol that prioritizes **speed** over reliability.
Unlike TCP, UDP sends data immediately without establishing a connection.

## UDP Flow

```text
Client → Server : Data

(No handshake)
(No acknowledgment)
(No retransmission)
```

If packets are lost or arrive out of order, UDP does not fix them.

---

## UDP Characteristics

- No connection setup
- No delivery guarantee
- No ordering guarantee
- No congestion control
- Very low overhead

---

## TCP vs UDP

| TCP | UDP |
|------|-----|
| Reliable | Fast |
| Ordered delivery | No ordering guarantee |
| Retransmits lost packets | No retransmission |
| Connection-oriented | Connectionless |
| Higher overhead | Minimal overhead |

---

## Choosing Between TCP and UDP

### Use TCP when reliability matters

- Web browsing (HTTP/HTTPS)
- APIs
- Database queries
- File downloads

**Requirement:** Every byte must arrive correctly.

---

### Use UDP when latency matters

- Video calls
- Voice calls
- Online gaming
- Live streaming
- IoT telemetry
- DNS lookups

**Requirement:** Current data is more important than perfect delivery.

---

## System Design Relevance

Most backend systems communicate over **TCP**:

- HTTP/HTTPS
- gRPC
- Database connections

UDP is commonly used for:

- Live video/audio streaming
- Multiplayer gaming
- IoT systems

---

## Hybrid Approach

### Pre-recorded video (YouTube, Netflix)

Uses **TCP**.

```text
Video
↓
Split into chunks
↓
Downloaded over HTTP/TCP
↓
Buffered
↓
Played
```

Small delays are acceptable.

---

### Real-time communication (Zoom, Teams)

Uses **UDP**.

```text
Camera
↓
Packet sent immediately
↓
Receiver
```

Dropped frames are better than delayed frames.

---

## Rule of Thumb

> TCP when reliability matters.
>
> UDP when latency matters.

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