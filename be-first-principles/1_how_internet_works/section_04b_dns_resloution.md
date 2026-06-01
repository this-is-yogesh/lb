**SECTION 4B - DNS resolution**

DNS resolution is a hierarchical lookup process that converts a domain name (like youtube.com) into an IP address. It involves multiple levels, starting from local caches to global DNS servers. Each level either serves the answer from its cache or forwards the query to the next level.
Resolution Steps

REFER to image dns-resolution.png
When a browser needs to resolve a domain, it follows this flow:

Browser Cache — Checks its own recent cache first.
OS Cache — Then checks the operating system’s local DNS cache.
Recursive Resolver — Query is sent to the ISP’s recursive resolver.
Root Server — Resolver queries a Root Name Server, which directs it to the TLD (.com) server.
TLD Server — The .com server points to the domain’s authoritative nameserver (e.g., Google’s DNS).
Authoritative Server — The authoritative server returns the final IP address.

Caching & TTL
Every level caches the response based on the TTL (Time To Live) value. Higher TTL means longer caching and fewer lookups, but slower propagation of changes.