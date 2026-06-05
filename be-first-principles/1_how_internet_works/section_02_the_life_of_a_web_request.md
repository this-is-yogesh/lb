

### **The Crux**

No matter what system you build (YouTube, WhatsApp, PayPal), data always travels the same way. System design is just choosing the right tools to handle this journey without slowing down (**Latency**).

---

### **Quick-Fire Concept Review**

* **DNS:** Translates names to IPs. *(Design use: Global routing & CDNs)*
* **IP & Ports:** **IP** = Home address; **Port** = Specific door.
* **TCP vs. UDP:** * **TCP:** Guaranteed delivery, slower. *(Use: Chat, Banking)*
* **UDP:** Fast, loses data. *(Use: Streaming, Gaming)*


* **HTTP/S:** The language used to talk. **HTTPS** is encrypted. *(Use: APIs)*
* **Latency / RTT:** The time it takes for data to go to the server and back.

---

### **The "Lifecycle" Cheat Sheet**

When a user taps a screen, this exact chain reaction happens:

Tap Screen ->DNS (Find IP)->TCP/TLS (Secure Connection) ->HTTP (Fetch Data)
->Pixels Render
