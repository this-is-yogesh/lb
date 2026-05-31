SLIDE 16: Single Server Architecture

The simplest possible system runs everything on one single machine: the web server, the application code, and the database all live together on the same computer.


REFER to image single_server_architecture.jpg

What Runs on This Single Server:

1. Web Server (Nginx or Apache)
   - Listens on port 80 or 443 for incoming traffic
   - Serves static files such as HTML, CSS, JavaScript, and images
   - Forwards dynamic requests to the application code

2. Application Code (Node.js, Django, Spring Boot, etc.)
   - Contains all business logic
   - Handles user authentication and authorization
   - Implements API endpoints
   - Usually runs on an internal port like 3000 or 8080

3. Database (PostgreSQL, MySQL, etc.)
   - Stores all persistent data
   - Runs on an internal port like 5432 (PostgreSQL) or 3306 (MySQL)
   - Data is stored directly on the local disk of the same machine


When This Architecture Works Well:

- Personal projects and prototypes
- Early stage MVPs (Minimum Viable Products)
- Low traffic applications (under 1,000 daily active users)
- Small datasets (under 10 GB)
- Solo developer or very small team where coordination is minimal


When This Architecture Starts to Break:

| Problem                | Symptom                                      | Threshold |
|------------------------|----------------------------------------------|---------|
| CPU exhaustion         | Requests start queuing up, response times increase sharply | >70% sustained CPU usage |
| Memory exhaustion      | Processes crash, system triggers OOM (Out of Memory) kills | >90% RAM usage |
| Disk I/O bottleneck    | Database queries become very slow (takes seconds) | Disk queue depth > 2 |
| Network saturation     | Packet loss occurs, frequent timeouts | >80% bandwidth utilization |
| Single point of failure| If the server crashes, the entire application goes down | Any hardware or software failure |


Important Note:
The first step most applications take when scaling is to separate the database from the application server. This allows each part to scale independently and is covered in Section 5 (Scaling).