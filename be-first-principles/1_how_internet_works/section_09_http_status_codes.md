# HTTP Status Codes

HTTP status codes indicate the result of a request.

## Categories

| Range | Meaning |
|---------|---------|
| 1xx | Informational |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client Error |
| 5xx | Server Error |

---

## Common Status Codes

### Success (2xx)

| Code | Meaning |
|--------|---------|
| 200 OK | Request successful |
| 201 Created | Resource created |
| 202 Accepted | Accepted for async processing |
| 204 No Content | Success, no response body |

---

### Redirection (3xx)

| Code | Meaning |
|--------|---------|
| 301 Moved Permanently | Permanent redirect |
| 302 Found | Temporary redirect |
| 304 Not Modified | Use cached version |

---

### Client Errors (4xx)

| Code | Meaning |
|--------|---------|
| 400 Bad Request | Invalid request |
| 401 Unauthorized | Authentication required |
| 403 Forbidden | No permission |
| 404 Not Found | Resource doesn't exist |
| 409 Conflict | State conflict (duplicate resource) |
| 429 Too Many Requests | Rate limit exceeded |

---

### Server Errors (5xx)

| Code | Meaning |
|--------|---------|
| 500 Internal Server Error | Server failure |
| 502 Bad Gateway | Upstream server returned invalid response |
| 503 Service Unavailable | Server overloaded or under maintenance |
| 504 Gateway Timeout | Upstream server timed out |

---

## System Design Relevance

### 429 Too Many Requests

Indicates rate limiting is protecting the system.

---

### 502 / 504

Usually mean an upstream service is unavailable or too slow.

```text
Client
 ↓
Gateway
 ↓
Service A
 ↓
Service B
```

If Service B fails:

- 502 Bad Gateway
- 504 Gateway Timeout

---

### 503 Service Unavailable

The system is intentionally rejecting requests.

Examples:

- Server overload
- Maintenance mode
- Circuit breaker activated

---

### 301 / 302 Redirects

Used heavily in URL shorteners.

```text
short.ly/abc
      ↓
302 Redirect
      ↓
youtube.com/watch?v=...
```

---

## API Design

Return meaningful status codes.

Example:

```text
POST /users

201 Created
→ User successfully created

409 Conflict
→ Username already exists

429 Too Many Requests
→ Rate limit exceeded
```

---

## Key Takeaway

> Status codes communicate the outcome of a request.

```text
2xx → Success
3xx → Redirect
4xx → Client Error
5xx → Server Error
```
**SECTION 9: HTTP Status Codes**

What are HTTP Status Codes?
Status codes tell the client what happened with their request. They are grouped into five categories based on the first digit.

Status Code Categories

| Range | Category          | Meaning                                      |
|-------|-------------------|----------------------------------------------|
| 1xx   | Informational     | Request received, processing continues       |
| 2xx   | Success           | Request was successful                       |
| 3xx   | Redirection       | Client must take additional action           |
| 4xx   | Client Error      | Client sent a bad request                    |
| 5xx   | Server Error      | Server failed to process a valid request     |

Important Status Codes

| Code | Name                    | When It’s Used |
|------|-------------------------|----------------|
| 200  | OK                      | Request succeeded |
| 201  | Created                 | New resource created (after POST) |
| 202  | Accepted                | Request accepted for async processing |
| 204  | No Content              | Success but no response body (DELETE) |
| 301  | Moved Permanently       | Resource moved to new permanent URL |
| 302  | Found                   | Temporary redirect |
| 304  | Not Modified            | Cached version is still valid |
| 400  | Bad Request             | Client sent invalid data |
| 401  | Unauthorized            | Authentication required |
| 403  | Forbidden               | Authenticated but no permission |
| 404  | Not Found               | Resource does not exist |
| 409  | Conflict                | Request conflicts with current state |
| 429  | Too Many Requests       | Rate limit exceeded |
| 500  | Internal Server Error   | Server crashed or unexpected error |
| 502  | Bad Gateway             | Upstream server gave bad response |
| 503  | Service Unavailable     | Server overloaded or in maintenance |
| 504  | Gateway Timeout         | Upstream server took too long |

System Design Context
In microservices:

- 502 / 504 → Usually means downstream service is down or slow
- 503 → System is intentionally rejecting requests (maintenance or circuit breaker)
- 429 → Rate limiting is working (protecting the system)
- 301 / 302 → Important for URL shorteners and redirects

Interview Tip
When designing APIs, mention specific status codes for different cases instead of just saying "returns 200 on success". This shows better understanding.