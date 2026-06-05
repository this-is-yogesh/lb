Here is the ultra-short, crisp revision summary for What is a Server.

---

### **The Crux**

A server is defined by its **software and role**, not its hardware. Any computer can be a server if it is configured to listen for, process, and respond to incoming network requests.

---

### **The 4 Infrastructure Types**

- **Bare Metal:** A physical computer in a rack. You own/rent the raw hardware.
- **Virtual Machine (VM):** A software-defined slice of a physical server (e.g., AWS EC2).
- **Container:** An ultra-lightweight, isolated process that shares the host machine's OS kernel (e.g., Docker).
- **Serverless:** Code runs on-demand without managing any underlying infrastructure (e.g., AWS Lambda).

---

### **Capacity Baseline (The Mid-Range Benchmark)**

When estimating scale in an interview, assume a standard mid-range server (8 vCPUs, 32 GB RAM) can comfortably handle:

- **1,000–5,000** simultaneous concurrent connections.
- **500–2,000** HTTP requests per second (RPS).

---

### **The Architectural Gap**

```text
Standard Server Capacity (2,000 RPS)
                ≪
YouTube Scale (500,000+ RPS)
```

**Daily Revision Trigger:** *Because a single machine maxes out at a few thousand requests per second, system design is not about buying a larger physical server (Vertical Scaling); it's about organizing thousands of these small machines to work as a single unit (Horizontal Scaling).*