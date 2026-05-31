**SECTION 11- Request-Response Lifecycle**

Complete Request-Response Lifecycle
This combines all previous concepts to show the full journey of an HTTP request from client to server and back.


REFER to image req-resp-lifecycle.png

Time Breakdown for a Typical Request

| Step                | Action                                      | Time            |
|---------------------|---------------------------------------------|-----------------|
| DNS resolution      | Look up IP address                          | 0-50ms (usually cached) |
| TCP handshake       | Establish connection                        | 20-50ms         |
| TLS handshake       | Negotiate encryption                        | 50-150ms        |
| Request transit     | Data travels from client to server          | 10-100ms        |
| Server processing   | Application logic + database queries        | 10-200ms        |
| Response transit    | Data travels from server to client          | 10-100ms        |
| Total               |                                             | 100-650ms       |

What Dominates Latency
- At small scale: Server processing time is the biggest factor
- At global scale: Network latency (physical distance between user and server) dominates

This is why CDNs are important - they serve content from a server physically close to the user, which greatly reduces latency.