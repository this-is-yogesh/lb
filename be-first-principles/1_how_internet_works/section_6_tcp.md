**SECTION 6 - TCP**

What are TCP and UDP?
After getting the IP address and port, we need a way to send data between client and server. TCP and UDP are the two main protocols that do this job, but they work very differently.

TCP (Transmission Control Protocol)
TCP is a reliable protocol. It makes sure data reaches the destination completely, in the correct order, and without any errors. It is used when accuracy is more important than speed.
How TCP Works
TCP is connection-oriented. Before sending any data, it sets up a connection using a Three-Way Handshake:

Client → Server: SYN (I want to connect)
Server → Client: SYN-ACK (Okay, I accept)
Client → Server: ACK (Connection established)

Only after this handshake can actual data be sent. This adds some delay (usually 50-150ms).
TCP Guarantees:

Data arrives in the same order it was sent
Lost packets are automatically retransmitted
Corrupted packets are detected and fixed
Flow control – slows down if the receiver is busy
Congestion control – slows down if the network is crowded

Cost / Disadvantages of TCP:

Extra overhead (20 bytes header per packet)
Needs acknowledgments for every packet
Handshake delay before data starts flowing
Retransmission of old data can be useless in real-time apps (like video calls or gaming)

Simple Example:
When you browse a website or use WhatsApp, TCP is used because you need all messages or webpage content to arrive correctly and in order.