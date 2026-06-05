
Here is the ultra-short, crisp revision summary for the ACID Bank Transfer Walkthrough.

---

### **The Crux**

A database transaction is a strict boundary line. The standard bank ledger transfer demonstrates why ACID is not a theoretical abstraction—it is the exact mechanism that prevents money from vanishing from disk during an infrastructure failure.

---

### **The 3-Step Transaction Block**

```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
  UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B';
COMMIT;
```

---

### **The ACID Failure-Shield Breakdown**

#### **1. Atomicity (The Rollback Guard)**

- **The Threat:** The server loses power right after deducting $500 from Account A, but *before* adding it to Account B.
- **The Protection:** The database engine catches the partial execution on reboot and executes a **Rollback**. Account A is instantly restored to $1000. Money never vanishes.

#### **2. Consistency (The Invariant Checker)**

- **The Threat:** A glitch attempts to push an illegal, unvalidated negative balance to disk.
- **The Protection:** Total system money must remain invariant ($1000 + 200 = 500 + 700 = $1200). If a schema constraint is broken, the engine immediately aborts the pipeline.

#### **3. Isolation (The Concurrency Blindfold)**

- **The Threat:** A secondary audit query reads Account A's balance *mid-transaction*, catching it while it's temporarily out of sync.
- **The Protection:** External queries can only read the state *before* the `BEGIN` or *after* the `COMMIT` ($1000 or $500), never the dirty, uncommitted intermediate step.

#### **4. Durability (The Write-Ahead Log)**

- **The Threat:** A success message is sent, but the server dies one millisecond later before the data files are modified on disk.
- **The Protection:** The database uses a **Write-Ahead Log (WAL)**. It commits the intention to the log file *first* before modifying the actual data tables. On restart, it simply replays the WAL to ensure compliance.

---

### **The Absolute Interview Rule: SQL vs. NoSQL**

```text
Financial/Inventory Pipelines
            ↓
SQL
(Strict ACID Compliant Engine)


Social Feeds / Metrics Logs
            ↓
NoSQL
(Tolerates Eventual Inconsistency)
```

**The Core Scripted Answer:** *"I am defaulting to a relational database for our core payment infrastructure specifically because of its ACID guarantees. We cannot afford eventual consistency or partial execution states when dealing with user ledgers."*

---

*Would you like to explore how the Write-Ahead Log (WAL) operates at the disk level to ensure durability, or step forward into Non-Relational NoSQL Databases?*
````
