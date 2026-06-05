Here is the ultra-short, crisp revision summary for the remaining part of Slide 22B.

---

### **The Crux**

Do not split a monolith because it's trendy. Split it only when you hit clear organizational walls (**team friction**) or physical infrastructure limits (**resource mismatches**).

---

### **The 5 Core Signals to Split a Monolith**

- **1. Team Scaling Pain:** Engineers are constantly fighting daily merge conflicts and code deployments are blocked by unrelated teams.
- **2. Independent Scaling Mismatch:** One single feature hogs all resources (e.g., Feed processing needs 100 servers, while User Login only needs 2).
- **3. Deployment Speed Mismatch:** One fast-moving team wants to deploy code 10 times a day, but is forced to wait for a slow-moving team that ships once a week.
- **4. Isolation & Reliability Split:** High-risk experimental features keep crashing critical core modules. (e.g., You want to isolate a shaky video uploader so it stops taking down the login page).
- **5. Technology Mismatch:** Different modules fundamentally require different stacks (e.g., Your core API runs on Java, but your machine learning/recommendation team *must* use Python).

---

### **Fast Revision Checklist**

Before moving to microservices, ensure you have checked at least one of these:

```text
Team Friction (Merge Hells)
            OR
Resource Hogging
            OR
Deployment Deadlocks
            ↓
       Time to Split
```