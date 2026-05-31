**SECTION 10: TLS and Encryption**

What is TLS?
TLS (Transport Layer Security) is the protocol that encrypts communication between client and server. HTTPS is simply HTTP running over TLS. It ensures that no one in between (like ISPs, Wi-Fi providers, or attackers) can read or change the data.

What TLS Protects Against

| Threat          | Without TLS                     | With TLS                          |
|-----------------|---------------------------------|-----------------------------------|
| Eavesdropping   | Anyone can read the data        | Data is encrypted and unreadable  |
| Tampering       | Data can be modified in transit | Changes are detected              |
| Impersonation   | Attacker can fake the server    | Server identity is verified with certificate |

TLS Handshake (Simplified)
Before data is encrypted, client and server do a TLS handshake:

1. Client Hello - Client tells supported TLS versions and cipher suites
2. Server Hello + Certificate - Server chooses version and sends its certificate
3. Client verifies the certificate (checks domain, expiry, trusted CA)
4. Key Exchange - Both agree on a shared secret key
5. Encrypted Communication starts using the shared key

Performance Cost
- TLS handshake adds extra latency (50-300ms depending on version)
- TLS 1.3 is faster than TLS 1.2
- Connection reuse (HTTP/2 keep-alive) helps reduce handshake frequency

System Design Relevance
- All public/external traffic should use HTTPS (TLS)
- TLS is usually terminated at Load Balancer or CDN
- After termination, traffic to backend servers is often unencrypted for better performance
- Internal service communication may use mTLS (mutual TLS) in strict security setups