The Crux
DNS lookup is a hierarchical game of "ask the next guy" until you find the exact IP. To save time, every step caches the answer using a TTL (Time to Live) timer.

Refer to image dns-resolution.png
The 6-Step Lookup Chain
Step 1 (Browser): Checks its own recent memory.

Step 2 (OS): Checks the local computer’s memory.

Step 3 (ISP Resolver): The middleman that does the hunting for you.

Step 4 (Root Server): Points to the extension server (.com).

Step 5 (TLD Server): Points to the company's server (google.com).

Step 6 (Authoritative Server): The final boss. Holds the actual IP.

$$\text{Browser / OS Cache} \longrightarrow \text{ISP Resolver} \longrightarrow \text{Root} \longrightarrow \text{TLD (.com)} \longrightarrow \text{Authoritative} \longrightarrow \text{IP Found!}$$