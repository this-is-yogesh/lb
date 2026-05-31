**SECTION 3 - Client Server Model**


The client-server model is the foundation of virtually every networked system. A client is any device or application that initiates a request. A server is any machine that receives that request, processes it, and sends back a response.
 
Examples of Clients:

* Web browser (Chrome, Safari, Firefox)
* Mobile app (Instagram app, WhatsApp)
* Desktop application (Slack, VS Code)
* Another server (Server A calling Server B’s API)

Examples of Servers:

* Web server (Nginx, Apache) serves static files
* Application server (Node.js, Django, Spring Boot) runs business logic
* Database server (PostgreSQL, MySQL) stores and retrieves data

 

```
| Property | Client | Server |
| --- | --- | --- |
| Initiates communication | Yes | No (waits for requests) |
| Quantity | Millions (one per user) | Hundreds to thousands |
| Location | User’s device | Data center |
| Availability requirement | None (can go offline) | High (should be always-on) |
```