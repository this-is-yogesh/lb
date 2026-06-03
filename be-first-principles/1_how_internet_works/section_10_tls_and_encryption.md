**TLS: Transport Layer Security**

HTTPS is HTTP + TLS. TLS encrypts the communication between client and server so that no one in between (ISPs, Wi-Fi operators, attackers) can read or modify the data.

**What TLS Protects Against:**

| Threat | Without TLS | With TLS |
| --- | --- | --- |
| Eavesdropping | Anyone on the network can read your data | Data is encrypted, unreadable to interceptors |
| Tampering | Data can be modified in transit | Integrity checks detect any modification |
| Impersonation | Attacker can pretend to be the server | Server proves identity with certificate |

**TLS Handshake (Simplified):**

```
Before encrypted data can flow, client and server perform a TLS handshake:

1. Client Hello
   Client → Server: "I support TLS 1.3, here are the cipher suites I know"

2. Server Hello + Certificate
   Server → Client: "Let's use TLS 1.3 with AES-256. Here's my certificate
                      signed by Let's Encrypt (a trusted Certificate Authority)"

3. Client Verifies Certificate
   Client checks: Is this certificate valid? Is it issued by a trusted CA?
                   Is the domain name correct? Has it expired?

4. Key Exchange
   Client and server agree on a shared secret key using
   asymmetric encryption (public/private keys).
   All further communication uses this shared key (symmetric encryption).

5. Encrypted Communication Begins
   All HTTP data is now encrypted with the shared key.
```

**Performance Cost:**

```
TLS handshake adds latency:
- TLS 1.2: 2 additional round trips (~100-300ms)
- TLS 1.3: 1 additional round trip (~50-150ms)
- TLS 1.3 with 0-RTT resumption: 0 additional round trips (returning visitors)

At scale, this matters:
- YouTube serves billions of requests per day
- Each new connection pays the TLS handshake cost
- HTTP/2 and keep-alive connections reduce this by reusing connections
```

**System Design Relevance:**

- All external traffic should be HTTPS (TLS terminated at load balancer or CDN)
- Internal service-to-service traffic within a data center is often unencrypted (performance) or uses mutual TLS (mTLS) in zero-trust environments
- TLS termination at the load balancer means the load balancer decrypts the request, inspects it, and forwards it unencrypted to backend servers this is the most common production pattern


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