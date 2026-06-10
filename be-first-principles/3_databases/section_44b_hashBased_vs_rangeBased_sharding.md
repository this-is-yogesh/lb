Here is the ultra-short, crisp revision summary for **Hash-Based vs Range-Based Sharding**.

---

# **The Crux**

After deciding to shard, the next question is:

> **How do we decide which shard stores a piece of data?**

There are two common strategies:

1. **Hash-Based Sharding**
2. **Range-Based Sharding**

---

# **1. Hash-Based Sharding**

The shard is chosen using a hash function.

```text id="cn4mgu"
shard_id = hash(user_id) % number_of_shards
```

Example with 4 shards:

```text id="ptbpvz"
User 12345
12345 % 4 = 1
→ Shard 1

User 67890
67890 % 4 = 2
→ Shard 2

User 99999
99999 % 4 = 3
→ Shard 3
```

---

# **Visual Picture**

```text id="2ed7qy"
Users
12345
67890
99999
55555
88888
      ↓

Hash Function

      ↓

┌─────────────┐
│ Shard 0     │
│ Shard 1     │
│ Shard 2     │
│ Shard 3     │
└─────────────┘
```

Hashing spreads users almost evenly.

---

# **Advantages**

### Even Distribution

No single shard becomes overloaded.

```text id="lmjlwm"
Shard 0 : 25%
Shard 1 : 25%
Shard 2 : 25%
Shard 3 : 25%
```

---

### Few Hot Spots

Celebrities and normal users get distributed randomly.

Load remains balanced.

---

### Good Default Choice

Used by:

```text id="djkn1l"
Instagram
Discord
Uber
Twitter
```

---

# **Disadvantages**

### Range Queries Become Expensive

Suppose we want:

```text id="4gb6e9"
Find all users created in January
```

Since users are spread randomly:

```text id="pif0r3"
Shard 0
Shard 1
Shard 2
Shard 3
```

must all be queried.

---

### Re-Sharding Is Difficult

Suppose:

```text id="9vjsmd"
4 shards
```

becomes:

```text id="jlwm3m"
8 shards
```

The formula changes:

```text id="v8khkt"
user_id % 4
```

becomes:

```text id="3r5i8p"
user_id % 8
```

Almost every record moves.

Migration becomes painful.

---

# **2. Range-Based Sharding**

Instead of hashing,

split data into ranges.

```text id="rv1buh"
Shard 0
User 1 - 1M

Shard 1
User 1M - 2M

Shard 2
User 2M - 3M

Shard 3
User 3M - 4M
```

---

# **Visual Picture**

```text id="a1vt9m"
Users

1 ─────── 1M
      ↓
    Shard 0

1M ─────── 2M
      ↓
    Shard 1

2M ─────── 3M
      ↓
    Shard 2
```

---

# **Advantages**

### Range Queries Are Fast

Suppose:

```text id="2bsyf8"
Find users 500K - 600K
```

Only:

```text id="ej7bqs"
Shard 0
```

needs to be queried.

No need to touch other shards.

---

### Simple to Understand

Very intuitive.

```text id="wjmbg8"
IDs 1-1M
→ Shard 0

IDs 1M-2M
→ Shard 1
```

---

# **Disadvantages**

### Uneven Distribution

New users always go to the latest shard.

```text id="hkuw4j"
Old Shards
Almost idle

Newest Shard
Very busy
```

---

### Hot Spots

Suppose a celebrity lives on:

```text id="4d2cv6"
Shard 0
```

Millions of requests now hit only:

```text id="g6x2v3"
Shard 0
```

while other shards are idle.

---

### Rebalancing Is Required

Eventually:

```text id="jfu2bm"
Shard 3
```

becomes too large.

You must manually split:

```text id="k6jmjp"
Shard 3
```

into:

```text id="dhj8xt"
Shard 3
+
Shard 4
```

---

# **Example**

### Query

```text id="nyupjlwm"
Find users between
500,000 and 600,000
```

### Hash-Based

```text id="76ijxa"
Must query:

Shard 0
Shard 1
Shard 2
Shard 3
```

because users are randomly distributed.

---

### Range-Based

```text id="o9tihf"
Only query:

Shard 0
```

because those IDs belong there.

---

# **Comparison Table**

| Feature           | Hash-Based | Range-Based |
| ----------------- | ---------- | ----------- |
| Data Distribution | ✓ Even     | ✗ Uneven    |
| Hot Spots         | Rare       | Common      |
| Range Queries     | Expensive  | Fast        |
| Re-Sharding       | Hard       | Easier      |
| Complexity        | Moderate   | Simple      |

---

# **Which One Should You Choose?**

### Most Applications

```text id="5m8a8g"
Hash-Based
```

Safe default.

Examples:

```text id="o1jlwm"
Instagram
Discord
Uber
Twitter
```

---

### Time-Series Data

```text id="5iuv3m"
Range-Based
```

Examples:

```text id="c06d2o"
Logs
Metrics
Events
Daily Records
```

because date ranges are common.

---

# **Fast Revision Pipeline**

```text id="sbjlwm"
Need Sharding
       ↓

How to split data?

       ↓

Hash-Based
(Random distribution)
       ↓
Balanced Load

OR

Range-Based
(ID ranges)
       ↓
Fast Range Queries
```

---

# **Memory Trick**

```text id="7yr8vx"
Hash
= Random

Range
= Ordered
```

---

# **Interview Default**

```text id="pt2jlp"
User-based systems
(Instagram, Uber, Discord)

→ Hash by user_id
```

This is almost always the safest answer.

---

# **Interview One-Liner**

```text id="jlwm7f"
Hash-based sharding provides even data distribution and avoids hot spots, while range-based sharding enables efficient range queries but can suffer from uneven load distribution.
```

---

# **Ultimate Picture**

```text id="6tjlwm"
Hash-Based

Users
      ↓
Random Distribution

S0  S1  S2  S3
✓ Balanced


======================

Range-Based

1-1M  → S0
1M-2M → S1
2M-3M → S2

✓ Fast Range Queries
✗ Uneven Load
```

---

### One Sentence To Remember

> **Hashing gives balance; ranges give locality.** 🚀
