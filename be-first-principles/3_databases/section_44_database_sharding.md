Here is the ultra-short, crisp revision summary for **Database Sharding**.

---

# **The Crux**

Replication copies the same data to many machines.

Sharding does something different:

> **Sharding splits the data across many machines.**

Instead of one huge database, we have multiple smaller databases called **shards**.

The goal is simple:

> **Split the data to scale storage and write capacity.**

---

# **Why Replication Alone Isn't Enough**

Replication helps with:

```text id="wdjz8m"
✓ More Reads
✓ Better Availability
```

But:

```text id="5x5p8z"
All Writes Still Go To One Primary
```

Eventually the primary reaches its limits:

```text id="70aqga"
Storage Limit
Write Throughput Limit
Connection Limit
```

One machine cannot grow forever.

---

# **The Solution: Sharding**

Instead of:

```text id="ydgmxa"
One Huge Database
```

split the data into:

```text id="8ck5jm"
Shard 1
Shard 2
Shard 3
Shard 4
```

Each shard stores only part of the data.

---

# **Visual Picture**

```text id="h34mzh"
                Application
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       Shard 1     Shard 2     Shard 3
     (Users A)   (Users B)   (Users C)
```

Think of:

```text id="dcn5tv"
Replication
= Copy the database

Sharding
= Divide the database
```

---

# **Example**

Suppose Instagram has:

```text id="xy9l0u"
500 Million Users
```

Storing everyone in one database is impossible.

Instead:

```text id="a4m42v"
Shard 1
Users 1 - 100M

Shard 2
Users 100M - 200M

Shard 3
Users 200M - 300M

Shard 4
Users 300M - 500M
```

Now each machine stores only a fraction of the total data.

---

# **Benefits**

Without sharding:

```text id="i6ct9n"
1 Database

Storage:
10 TB

Writes:
10,000/sec
```

With 4 shards:

```text id="w9r0rb"
4 Databases

Storage:
40 TB

Writes:
40,000/sec
```

Sharding gives:

```text id="e9jtx9"
Horizontal Scaling
```

---

# **Shard Key**

A shard key determines:

> **Which shard stores a particular record.**

This is the most important decision in sharding.

Example:

```text id="9xpb7w"
user_id
```

can be the shard key.

---

# **How Data Is Distributed**

Suppose:

```text id="zlt5ll"
4 shards
```

Formula:

```text id="9s7fjr"
shard_id =
hash(user_id) % 4
```

---

### User 12345

```text id="kkmfx0"
12345 % 4 = 1
```

Stored in:

```text id="gf1n2w"
Shard 1
```

---

### User 67890

```text id="k54w2p"
67890 % 4 = 2
```

Stored in:

```text id="t72hkk"
Shard 2
```

---

### User 99999

```text id="7uwmbt"
99999 % 4 = 3
```

Stored in:

```text id="2v0pqg"
Shard 3
```

---

# **Request Flow**

Suppose Alice has:

```text id="uhszjx"
user_id = 12345
```

Application computes:

```text id="p8h1aa"
12345 % 4 = 1
```

and sends the query directly to:

```text id="7jws2p"
Shard 1
```

No other shards are involved.

---

# **Fast Revision Pipeline**

```text id="sl3azn"
Database Too Big
         ↓
Split Data
         ↓
Multiple Shards
         ↓
Each Shard Holds
Part Of The Data
         ↓
More Storage
More Write Capacity
```

---

# **Replication vs Sharding**

```text id="t4r61v"
Replication
----------
Copies Data

Purpose:
Scale Reads

All servers contain
the same data.
```

```text id="v33az6"
Sharding
---------
Splits Data

Purpose:
Scale Writes and Storage

Each server contains
different data.
```

---

# **Memory Trick**

```text id="3x95nd"
Replication
= Copy

Sharding
= Divide
```

---

# **Interview One-Liner**

```text id="ff1bnm"
Sharding is the process of horizontally partitioning a database into multiple smaller databases called shards, where each shard stores a subset of the data to increase storage capacity and write throughput.
```

---

# **Ultimate Picture**

```text id="vll1ej"
Replication

Primary
   ↓
Replica 1
Replica 2

(All contain same data)

===================

Sharding

Application
     │
 ┌───┼───┐
 ↓   ↓   ↓
S1  S2  S3

(Each contains different data)
```

---

# **One Sentence To Remember**

> **Replication copies data to scale reads, while sharding splits data to scale storage and writes.**

---

### Mental Journey So Far

```text id="9l7zcw"
Normalization
(Store once)
        ↓
Denormalization
(Store extra for speed)
        ↓
Replication
(Copy data)
        ↓
Sharding
(Split data)
```

This sequence forms the foundation of almost every large-scale system (Instagram, YouTube, Netflix, Uber, Amazon, etc.). 🚀
