**SECTION 4 - Domain Name System ( DNS )**

When you type a domain name like youtube.com into your browser, your computer needs to find the actual IP address of YouTube’s server to connect to it. Computers communicate using IP addresses (for example, 142.250.80.46), not human-readable names. DNS is the system responsible for translating domain names into their corresponding IP addresses.

Analogy:
DNS works like a phone book. You know the person’s name (youtube.com), but to actually call them you need their phone number (142.250.80.46). DNS performs this lookup quickly and efficiently.

Examples:

Input:  youtube.com
Output: 142.250.80.46

Input:  instagram.com
Output: 157.240.1.174

Input:  amazon.com
Output: 205.251.242.103


Why Not Just Use IP Addresses Directly?

| Reason                | Explanation |
|-----------------------|-----------|
| Human readability     | youtube.com is much easier to remember and type than 142.250.80.46 |
| IP addresses change   | Servers move or infrastructure gets updated. DNS handles these changes without users noticing |
| Multiple IPs per domain | Popular websites like YouTube have hundreds of servers. DNS can return different IPs for different users |
| Load distribution     | DNS can direct users to the nearest or least loaded server based on geographic location |


DNS Record Types:

| Record Type | Purpose                              | Example |
|-------------|--------------------------------------|---------|
| A           | Maps a domain to an IPv4 address     | youtube.com → 142.250.80.46 |
| AAAA        | Maps a domain to an IPv6 address     | youtube.com → 2607:f8b0:4004:800::200e |
| CNAME       | Creates an alias (maps one domain to another domain) | www.youtube.com → youtube-ui.l.google.com |
| MX          | Specifies the mail server for the domain | Used for handling email for youtube.com |
| NS          | Points to the authoritative name servers for the domain | youtube.com → ns1.google.com |