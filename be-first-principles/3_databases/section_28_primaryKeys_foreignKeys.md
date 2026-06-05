
Here is the ultra-short, crisp revision summary for Primary Keys and Foreign Keys.

---

### **The Crux**

Keys enforce structure and absolute data validity at the database engine layer. They remove the burden of data integrity checking from your application code, ensuring that your table connections never snap due to bugs or missing references.

---

### **Primary Keys: Single vs. Composite**

- **Single Primary Key:** A single column that guarantees every single row has a unique identifier (e.g., `user_id`). It can never be `NULL`.
- **Composite Primary Key:** Two or more columns joined together to form a unique identifier.
- *System Design Example:* A `follows` table uses `PRIMARY KEY (follower_id, followee_id)`. This mathematically guarantees that User A can follow User B exactly once.

---

### **Foreign Keys & Referential Integrity**

A Foreign Key acts as a hard logical link pointing from a row in one table directly to the Primary Key of another table.

```sql
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
```

#### **The 3 Database-Enforced Guarantees**

1. **No Ghosts:** You cannot create a post for `user_id = 999` if User 999 does not exist in the parent `users` table.
2. **No Orphans (`ON DELETE CASCADE`):** If a user deletes their account, the database engine automatically sweeps the disk and wipes out all of that user's posts instantly.
3. **App-Agnostic Safety:** Data consistency is handled globally by the database, meaning an application bug cannot accidentally corrupt the data structure.

---

### **The Extreme-Scale Trade-Off**

```text
Foreign Key Checks Enabled
(✓ Perfect Consistency)
            ↔
Disabled Checks
(✓ Faster Write Throughput)
```

**The Interview Pivot:** *At hyper-scale (billions of writes/day), the computational overhead of verifying foreign keys across massive, distributed server clusters degrades performance. Giant platforms often deliberately disable foreign key constraints and force the application layer to manage consistency to maximize database write speeds.*

---

*Would you like to drill into how Database Joins use these keys to piece data back together, or look at how Indexes prevent full table scans?*
````
