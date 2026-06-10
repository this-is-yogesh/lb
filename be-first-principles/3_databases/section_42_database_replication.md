Here is the ultra-short, crisp revision summary for **Database Replication**.

---

### **The Crux**

Replication means **keeping copies of the same database on multiple servers**.

The goals are simple:

> **More Reads + Higher Availability**

Replication solves two major problems:

* **Scale:** One database server cannot handle unlimited traffic.
* **Reliability:** If one server dies, the whole application should not go down.

---

### **Why One Database Server Isn't Enough**

Suppose:

```text id="o98h2k"
1 Database Server can handle 10,000 reads/sec
```
But your application receives:

```text id="0j0dqw"
100,000 reads/sec
```

A single machine becomes overloaded.

Also:

```text id="5t8zhw"
Server crashes
       ↓
Entire website goes down
```

This is called a:

> **Single Point of Failure (SPOF)**

---

### **The Solution: Replication**

Instead of one database:

```text id="cfr9wg"
          Primary
             |
      ----------------
      |              |
   Replica 1      Replica 2
```

All servers contain the same data.

Now:

* **Writes go to the Primary**
* **Reads can go to any Replica**

This increases capacity and provides backup.

---

### **Replication Vocabulary**

### Primary (Master)

The main database server.

It handles:

```sql id="j3odho"
INSERT
UPDATE
DELETE
```

Example:

```text id="2rz0gv"
Add user
Change email
Delete order
```

Only the Primary modifies data.

---

### Replica (Follower)

Copy servers containing the same data.

They mostly handle:

```sql id="mq3vbm"
SELECT
```

Example:

```text id="7s4hqe"
View profile
Search products
Load homepage
```

You can add many replicas to handle more traffic.

---

### Write-Ahead Log (WAL)

Whenever the Primary changes data:

```text id="f4nnr0"
INSERT user
UPDATE product
DELETE comment
```

it records these changes in a log.

Replicas continuously read this log and replay the same operations.

Think of WAL as:

```text id="ptz0d3"
Primary's instruction notebook
```

that replicas follow.

---

### Replication Lag

Changes are not copied instantly.

Example:

#### User changes profile picture

```text id="cr9yfm"
Primary
Picture = New
```

But Replica may still have:

```text id="yhzmr2"
Picture = Old
```

for a few milliseconds.

This delay is called:

> **Replication Lag**

---

### Failover

Suppose:

```text id="ppk9nv"
Primary crashes
```

Without replication:

```text id="9oc5wk"
Website down ❌
```

With replication:

```text id="d4k8ta"
Replica promoted
       ↓
Becomes new Primary
       ↓
Website continues running
```

This process is called:

> **Failover**

---

### Complete Flow

```text id="jlwm5n"
User Creates Post
         ↓
Primary Writes Data
         ↓
Stores Change in WAL
         ↓
WAL Sent to Replicas
         ↓
Replicas Apply Changes
         ↓
Replicas Serve Reads
```

---

### Real Example

Instagram receives:

```text id="kxg8ja"
Millions of profile views
```

Flow:

```text id="ukr0yr"
User uploads photo
        ↓
Primary database writes data
        ↓
Replicas receive updates
        ↓
Millions of users read from replicas
```

Thus:

```text id="yxq3a6"
1 write
Millions of reads
```

without overloading a single database.

---

### Fast Revision Pipeline

```text id="1hlhlv"
Need More Capacity
        ↓
Create Database Copies
        ↓
Primary Handles Writes
        ↓
Replicas Handle Reads
        ↓
Higher Throughput
and Better Reliability
```

---

### Memory Trick

```text id="s9g0zb"
Primary
= Boss

Replicas
= Workers

WAL
= Instructions

Failover
= Promote a Worker to Boss
```

---

### Interview One-Liner

```text id="vhg30j"
Replication is the process of maintaining copies of a database across multiple servers so that writes go to the primary, reads are distributed to replicas, and the system remains available even if a server fails.
```

---

### Ultimate Memory Picture

```text id="4vjlwm"
                Write
                  ↓
              Primary
                  |
        -------------------
        |                 |
     Replica 1         Replica 2
        ↑                 ↑
             Read Traffic
```

---

### One Sentence to Remember

> **Replication copies the database across multiple machines to scale reads and eliminate single points of failure.**
