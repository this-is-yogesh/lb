Here is the ultra-short, crisp revision summary for UDP and Protocol Selection.

---

### **The Crux**

**UDP** is the internet’s **speed demon**. It is a "fire-and-forget" protocol that skips handshakes and confirmations. It trades 100% accuracy for absolute maximum speed.

---

### **UDP Characteristics**

* **No Handshake:** Data is sent instantly with zero connection setup.
* **No Guarantees:** Packets can be lost or arrive out of order, and the protocol won't care.
* **Lightweight:** Only an 8-byte header (compared to TCP's bulky 20 bytes).

---

### **The Protocol Selection Matrix**

| Use Case | Protocol | The "Why" |
| --- | --- | --- |
| **Web / APIs / Databases** | **TCP** | Data integrity is non-negotiable. Missing data breaks things. |
| **Live Calls / Gaming** | **UDP** | Speed/Real-time interaction matters more than a dropped frame. |
| **DNS Lookups** | **UDP** | Queries are small and stateless; needs to be lightning-fast. |

---

### **System Design Interview Gold: The Video Streaming Nuance**

* **Live Video Calls (Zoom/Teams):** Uses **UDP**. There is no time to buffer; a delayed packet is useless.
* **Pre-recorded Video (YouTube/Netflix):** Uses **TCP** (via protocols like HLS/DASH). The video is chopped into small chunks, downloaded reliably, and buffered. A tiny buffering delay is acceptable for high-quality, uncorrupted video.

**Daily Revision Trigger:** *Only pitch UDP in an interview for Live Streaming, Multiplayer Games, or high-volume IoT sensor ingestion.*