Here is the ultra-short, crisp revision summary for **Primary-Replica Architecture and Replication Lag**.

---

# **The Crux**

Replication lets us scale reads by copying the database to multiple servers.

The idea is simple:

> **One Primary handles writes, many Replicas handle reads.**

This increases throughput and improves availability.

---

Refer to image primary_repilca_architecture.png

# **Primary-Replica Architecture**

```text
                     WRITE
                       ↓
                   Primary
              (Source of Truth)
                       │
                 WAL / Logs
          ┌────────────┼────────────┐
          ↓            ↓            ↓
      Replica 1    Replica 2    Replica 3
        (Reads)      (Reads)      (Reads)
          ↑             ↑             ↑
          └──── Application Reads ────┘
```

Think of:

```text
Primary
= Boss

Replicas
= Assistants

WAL
= Instructions sent by the Boss
```

---

# **Write Path**

Suppose Alice creates a post.

### Step 1

Application sends:

```sql
INSERT INTO posts ...
```

to the Primary.

---

### Step 2

Primary executes the query.

---

### Step 3

Primary records the change inside the WAL.

```text
WAL

1. Create post
2. Add like
3. Update profile
```

---

### Step 4

WAL entries are sent to replicas.

---

### Step 5

Replicas replay the same operations.

Eventually all servers contain identical data.

---

### Complete Flow

```text
User Creates Post
         ↓
Primary Executes Write
         ↓
Writes Change to WAL
         ↓
WAL Sent to Replicas
         ↓
Replicas Apply Changes
```

---

# **Read Path**

Suppose Bob opens Instagram.

Application sends:

```sql
SELECT * FROM posts
```

to one replica.

```text
Replica 1
Replica 2
Replica 3
```

The load is distributed among replicas.

---

### Example Distribution

```text
Primary
10% Reads
100% Writes

Replica 1
30% Reads

Replica 2
30% Reads

Replica 3
30% Reads
```

---

# **Capacity Improvement**

Suppose one database can handle:

```text
10,000 reads/sec
```

Without replication:

```text
1 Database
=
10,000 reads/sec
```

With:

```text
1 Primary
+
3 Replicas
```

capacity becomes:

```text
40,000 reads/sec
```

Thus replication gives:

```text
4× read capacity
```

---

# **Replication Lag**

Replication is usually asynchronous.

Changes do not arrive instantly.

Suppose:

```text
t = 0 ms
Alice creates a post
```

The Primary immediately has:

```text
Post = Present
```

But Replica 2 may still have:

```text
Post = Missing
```

because the WAL hasn't reached it yet.

---

### Timeline

```text
t=0ms
Write to Primary
        ↓

t=50ms
User refreshes page
        ↓

Read goes to Replica
        ↓

Replica still has old data
        ↓

t=200ms
Replication completes
```

This delay is called:

> **Replication Lag**

Usually:

```text
100-500 milliseconds
```

---

# **The Problem**

Alice posts a photo.

Immediately refreshes.

The request goes to Replica 2.

Replica 2 hasn't received the update yet.

Alice sees:

```text
"No posts"
```

even though she just uploaded one.

To users:

```text
This feels like a bug.
```

---

# **Read-After-Write Consistency**

The user who just wrote data expects to see it immediately.

### Solution:

For a few seconds after a write:

```text
Read from Primary
```

instead of a Replica.

---

### Flow

```text
User Creates Post
        ↓
Mark User As Recently Written
        ↓
Next Few Seconds
        ↓
Read From Primary
        ↓
Guaranteed Fresh Data
```

After the window expires:

```text
Read From Replicas Again
```

---

# **Important Insight**

```text
User who wrote
Needs Strong Consistency
```

but

```text
Everyone else
Can tolerate eventual consistency
```

Example:

```text
Alice posts a picture.
```

Alice expects to see it instantly.

But Bob viewing Alice's profile 200ms later won't notice or care.

---

# **Replication Types**

| Type                 | Lag         | Consistency            | Write Speed | Typical Use                 |
| -------------------- | ----------- | ---------------------- | ----------- | --------------------------- |
| **Asynchronous**     | 100-500 ms  | Eventual               | Fast        | Instagram, YouTube, Twitter |
| **Synchronous**      | 0 ms        | Strong                 | Slow        | Banking, Financial systems  |
| **Semi-Synchronous** | Nearly 0 ms | Strong for one replica | Moderate    | Compromise approach         |

---

# **Trade-Off**

```text
Asynchronous
✓ Fast Writes
✗ Small Replication Lag

Synchronous
✓ Strong Consistency
✗ Slower Writes
```

---

# **Fast Revision Pipeline**

```text
Application Writes
         ↓
Primary Database
         ↓
WAL Created
         ↓
WAL Sent To Replicas
         ↓
Replicas Replay Changes
         ↓
Applications Read From Replicas
```

---

# **Memory Trick**

```text
Primary
= Boss

WAL
= Instructions

Replicas
= Workers

Replication Lag
= Delay in receiving instructions

Read-After-Write Consistency
= Writer reads from Boss directly
```

---

# **Interview One-Liner**

```text
Primary-replica architecture scales reads by sending writes to a single primary and distributing reads across multiple replicas, while handling replication lag through techniques like read-after-write consistency.
```

---

# **Ultimate Picture**

```text
                    Write
                      ↓
                  Primary
                (Truth)
                      │
                 WAL Stream
      ┌──────────────┼──────────────┐
      ↓              ↓              ↓
 Replica 1       Replica 2       Replica 3
   Reads            Reads           Reads
      ↑              ↑              ↑
      └──── Millions of Users ──────┘
```

---

### One Sentence to Remember

> **Scale writes vertically with one Primary, scale reads horizontally with many Replicas, and handle replication lag with read-after-write consistency.** 🚀
