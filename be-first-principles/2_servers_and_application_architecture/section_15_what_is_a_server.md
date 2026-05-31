**SECTION 15: What is a Server**


A server is a computer that listens for incoming requests from clients, processes them, and sends back appropriate responses. There is nothing special about the hardware itself. Any regular laptop or desktop can act as a server. What makes a machine a “server” is the software running on it and the specific role it plays in the overall system architecture.

What We’ll Cover:
1. Single server architecture
2. Stateful vs stateless servers
3. Server types (web, application, database)
4. Reverse proxies
5. API gateways
6. Monolith vs microservices


Physical vs Cloud Servers:

| Type              | Description                                      | Example |
|-------------------|--------------------------------------------------|---------|
| Bare metal        | Physical machine located in a data center that you own and manage | Dell PowerEdge, HP 
| Virtual machine (VM) | Software-defined server that runs on shared physical hardware | AWS EC2, Azure VM, Google Compute Engine |
| Container         | Lightweight, isolated environment that shares the host operating system kernel | Docker container running on Kubernetes |
| Serverless        | You don’t manage any servers. The cloud provider runs your code on demand | AWS Lambda, Azure Functions |


Typical Production Server Specs:

A mid-range cloud server (for example, AWS m5.2xlarge) usually has:

- CPU: 8 vCPUs
- RAM: 32 GB
- Storage: 500 GB SSD (EBS)
- Network: Up to 10 Gbps
- Cost: ~$280/month (on-demand), ~$170/month (reserved 1-year)

This single machine can typically handle:
- 1,000 - 5,000 concurrent connections
- 500 - 2,000 HTTP requests per second (depending on how complex the requests are)
- 10 - 50 database queries per request

At massive scale like YouTube (which handles 500,000+ requests per second), you need hundreds or even thousands of such machines working together. The rest of this section explains different ways to organize and manage these servers efficiently.