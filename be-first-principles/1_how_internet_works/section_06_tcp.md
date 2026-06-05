Here is the ultra-short, crisp revision summary for TCP.

---

### **The Crux**

**TCP** is the internet’s **perfectionist**. It guarantees that data arrives 100% complete, error-free, and in the exact right order. The cost of this perfection is **speed (latency)**.

---

### **The 3-Way Handshake (Connection Setup)**

Before any real data can move, the client and server must agree to talk:

1. **SYN:** *"Can we talk?"* (Client $\rightarrow$ Server)
2. **SYN-ACK:** *"Yes, I'm ready."* (Server $\rightarrow$ Client)
3. **ACK:** *"Got it, starting now."* (Client $\rightarrow$ Server)

> ⚠️ **System Design Impact:** This handshake adds **1.5 round trips (RTT)** of pure delay before data even starts moving.

---

### **TCP's Ironclad Guarantees**

* **Ordered & Reliable:** If packet #2 gets lost, TCP stops everything and forces a retransmission until #2 arrives.
* **Traffic Control:** It monitors network traffic and slows down sending data if the receiver or the network gets overwhelmed (**Flow & Congestion Control**).

---

### **The Cost & The Video Trap**

* **Overhead:** Every single packet has a heavy 20-byte header, and every receipt requires a confirmation ("ACK") back.
* **The System Design Trap:** TCP is **terrible** for live video calls or gaming. If a packet drops during a live stream, TCP pauses to fetch it. But a frame from 2 seconds ago is useless to a user—they need the *current* frame right now.