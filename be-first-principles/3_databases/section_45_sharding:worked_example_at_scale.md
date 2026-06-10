Here is the ultra-short, crisp revision summary for **Sharding at Scale**.

---

# **The Crux**

One database cannot store or serve Instagram-scale traffic.

The solution is simple:

> **Split users across many shards and let each shard behave like a mini database.**

This gives almost unlimited:

* Storage
* Read capacity
* Write capacity

---

# **Instagram Example**

Suppose Instagram has:

```text id="s2hprv"
2 Billion Users
36 TB Data
100,000 Reads/sec
1,000 Writes/sec
```

One machine cannot handle this.

So Instagram creates:

```text id="zltjlwm"
1000 Shards
```

---

# **Shard Key**

Use:

```text id="jlwm45"
user_id % 1000
```

Example:

```text id="xxyb99"
User 12345

12345 % 1000

= 345
```

Therefore:

```text id="7rqpkb"
User 12345
→ Shard 345
```

---

# **Visual Picture**

```text id="x5ol6p"
                    Users
                       │
              user_id % 1000
                       │
      ┌────────────────┼────────────────┐
      ↓                ↓                ↓
   Shard 0          Shard 345        Shard 999
```

Every user belongs to exactly one shard.

---

# **Users Per Shard**

Total users:

```text id="l8jlwm"
2 Billion
```

Number of shards:

```text id="bx36rp"
1000
```

Therefore:

```text id="1dcb3n"
2 Billion / 1000

= 2 Million Users
per shard
```

---

# **Data Per Shard**

Total data:

```text id="7mrnh7"
36 TB
```

Split across:

```text id="kjlwm2"
1000 shards
```

Each shard stores:

```text id="cz17o9"
36 GB
```

instead of one giant database storing:

```text id="x8i3qe"
36 TB
```

---

# **Each Shard Has Replication**

Every shard contains:

```text id="jlwm8h"
1 Primary
+
3 Replicas
```

So:

```text id="uj4rj5"
4 database instances
per shard
```

---

Since there are:

```text id="wq95j0"
1000 shards
```

Total databases become:

```text id="atjjlwm"
1000 × 4

= 4000 database instances
```

---

# **Read Capacity**

Each database instance handles:

```text id="jjlwm9"
10,000 reads/sec
```

Per shard:

```text id="gqljlwm"
4 × 10,000

= 40,000 reads/sec
```

Across all shards:

```text id="0fwjlwm"
1000 × 40,000

=
40 Million reads/sec
```

Instagram only needs:

```text id="sjlwm3"
100,000 reads/sec
```

Therefore:

```text id="iqjlwm"
400× headroom
```

for growth and traffic spikes.

---

# **Write Capacity**

Each shard has one Primary.

Capacity:

```text id="jlwm4w"
10,000 writes/sec
```

Across 1000 shards:

```text id="jlwm5e"
1000 × 10,000

=
10 Million writes/sec
```

Instagram needs:

```text id="jlwm6r"
1,000 writes/sec
```

Therefore:

```text id="jlwm7t"
10,000× headroom
```

---

# **Data Co-Location**

This is the most important idea.

Suppose:

```text id="u5jlwm"
User 12345
```

belongs to:

```text id="v6jlwm"
Shard 345
```

Then **everything related to that user** is stored together.

---

### Shard 345 contains:

```text id="jlwm8y"
✓ User profile

✓ User's posts

✓ Follow relationships

✓ Likes

✓ Comments
```

---

# **Visual Picture**

```text id="rjlwm9"
Shard 345

----------------

User 12345

Profile
Posts
Likes
Comments
Follows

----------------
```

Everything for that user lives on one machine.

---

# **Benefit**

Suppose Alice opens her profile.

Need:

```text id="jlwm10"
Profile
+
Posts
```

Because both are on:

```text id="jlwm11"
Shard 345
```

the query touches only:

```text id="jlwm12"
One shard
```

No communication with other shards is needed.

---

# **Fast Revision Pipeline**

```text id="jlwm13"
Too Much Data
        ↓
Split Into Shards
        ↓
user_id % 1000
        ↓
Users Distributed
Across 1000 Databases
        ↓
Replication Inside Each Shard
        ↓
Massive Capacity
```

---

# **Memory Trick**

```text id="jlwm14"
Replication
= Copy Data

Sharding
= Split Data

Co-location
= Keep Related Data Together
```

---

# **The Big Insight**

```text id="jlwm15"
User 12345
        ↓
Shard 345
        ↓
Everything about User 12345
Lives There
```

This avoids:

```text id="jlwm16"
Cross-shard queries
```

which are slow and complicated.

---

# **Interview One-Liner**

```text id="jlwm17"
Large systems shard data by user_id so that all data related to a user is colocated on a single shard, enabling single-shard queries and horizontal scaling.
```

---

# **Ultimate Picture**

```text id="jlwm18"
                user_id % 1000
                       ↓

         ┌─────────────┬─────────────┐
         ↓             ↓             ↓
     Shard 0       Shard 345      Shard 999
    (2M users)     (2M users)    (2M users)

       ↓                ↓               ↓

  Primary + 3      Primary + 3     Primary + 3
   Replicas          Replicas         Replicas
```

---

# **One Sentence To Remember**

> **Sharding distributes users across many databases, and co-location keeps everything related to a user on the same shard, making queries fast and scalable.** 🚀
