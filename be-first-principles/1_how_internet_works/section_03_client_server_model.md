

### **The Crux**

The internet runs on a **Question-and-Answer** format. The **Client** always asks the question (initiates), and the **Server** always provides the answer (processes).

---

### **Core Concepts**

* **Client:** Any device/app that *starts* the conversation.
* *Examples:* Browsers, mobile apps, or even another server asking for data.


* **Server:** The always-on machine that *waits* for requests, processes them, and replies.
* *Examples:* Web servers (Nginx), App servers (Node.js), Database servers (MySQL).



---

### **Quick Comparison (Revision Matrix)**

| Property | Client | Server |
| --- | --- | --- |
| **Action** | **Initiates** communication | **Waits** for requests |
| **Quantity** | **Millions** (one per user) | **Thousands** (centralized) |
| **Location** | User's device | Data center / Cloud |
| **Uptime** | Can go offline anytime | Must be **always-on** (High Availability) |