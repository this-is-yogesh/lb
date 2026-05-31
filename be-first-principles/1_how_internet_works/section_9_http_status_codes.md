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