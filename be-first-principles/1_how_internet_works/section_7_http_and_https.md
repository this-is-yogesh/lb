**SECTION 7 - HTTP and HTTPS**

What is HTTP?
HTTP (HyperText Transfer Protocol) is the main protocol used by web browsers and servers to communicate. It runs on top of TCP and defines how requests and responses are structured.

HTTP Request-Response Model
HTTP works in a simple request-response pattern:

Client Request includes:
- Method (GET, POST, PUT, DELETE)
- URL (which resource to access)
- Headers (metadata like authentication, content type)
- Body (data sent in POST/PUT requests)

Server Response includes:
- Status Code (200 OK, 404 Not Found, 500 Error)
- Headers (content type, caching info, cookies)
- Body (HTML, JSON, images, etc.)

Example: Loading a YouTube Video Page

Request:
GET /watch?v=dQw4w9WgXcQ HTTP/1.1
Host: youtube.com
Accept: text/html

Response:
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 256000

response : 
... YouTube page HTML ...

HTTP Versions

| Version   | Year | Key Feature                          |
|-----------|------|--------------------------------------|
| HTTP/1.0  | 1996 | One request per TCP connection       |
| HTTP/1.1  | 1997 | Keep-alive (reuse connection)        |
| HTTP/2    | 2015 | Multiplexing (multiple requests in parallel) |
| HTTP/3    | 2022 | Uses QUIC (UDP-based) for lower latency |

Most systems today use HTTP/1.1 or HTTP/2. HTTP/3 is growing in adoption.

HTTPS is HTTP with encryption (using TLS/SSL). It protects data in transit and is used by almost all modern websites for security.