
Here is the ultra-short, crisp revision summary for API Gateways.

---

### **The Crux**

An **API Gateway** is a specialized, intelligent reverse proxy built explicitly for managing API traffic in a microservices architecture. It acts as a single centralized shield that handles all shared app-level concerns (**Auth, Rate Limiting, Versioning**), so individual microservices don't have to code them from scratch.

---
Refer to image api_gateways.png

### **Reverse Proxy (Nginx) vs. API Gateway (Kong/AWS)**

| Feature | Reverse Proxy | API Gateway |
| --- | --- | --- |
| **Routing** | Basic (URL paths only). | **Advanced** (Checks headers, weights, and methods). |
| **Authentication** | None or very basic. | **Native** (Validates JWT tokens, OAuth, API Keys). |
| **Rate Limiting** | Basic (IP tracking). | **Advanced** (Tracks user IDs, specific plans, or endpoints). |
| **Transformations** | None. | **Yes** (Can alter headers, bodies, or query parameters). |
| **Resilience** | None. | **Native Circuit Breaking** (Cuts off traffic to dying services). |

---

### **The Request Lifecycle at the Gateway**

```text
Client Request (JWT Token Included)
                ↓
           API Gateway
                ↓

1. Auth
   - Decrypts and validates the JWT token.

2. Transform
   - Extracts user_id from the token and injects it into
     a new internal header (X-User-Id: 123).

3. Guard
   - Checks the Rate Limiter to ensure the user
     has remaining quota.

4. Route
   - Forwards the clean request to the respective microservice.

                ↓

Microservice receives a pre-authenticated request
and runs pure business logic.
```

---

### **Interview Blueprint Rule**

Always put an API Gateway right behind your Load Balancer in microservices questions.

> **The Pivot Response:** *"I'm placing an API Gateway here to centralize cross-cutting concerns like JWT validation, circuit breaking, and rate limiting. This keeps our downstream services completely lightweight and focused strictly on business logic."*
````
