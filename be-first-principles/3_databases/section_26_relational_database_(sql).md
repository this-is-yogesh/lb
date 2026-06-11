# Relational Databases (SQL)

A **Relational Database** stores data in the form of **tables**, just like an Excel spreadsheet.

Each table contains:

- **Columns** → Describe what information is stored.
- **Rows** → Actual data entries.

For example, a `users` table:

| id | name | email |
|----|------|---------|
| 1 | Mukul | mukul@gmail.com |
| 2 | Priya | priya@gmail.com |

Here:

- Columns = `id`, `name`, `email`
- Rows = Information about individual users

---

# Core Terminology

## 1. Table (Relation)

A table is a collection of related data.

### Example

`users` table

| id | name | email |
|----|------|---------|
| 1 | Mukul | mukul@gmail.com |
| 2 | Priya | priya@gmail.com |

Think of it as an Excel sheet.

---

## 2. Row (Record/Tuple)

A row represents one complete item or record.

Example:

| id | name | email |
|----|------|---------|
| 1 | Mukul | mukul@gmail.com |

This entire row represents one user.

---

## 3. Column (Field/Attribute)

Columns describe properties of the data.

Example:

| Column | Meaning |
|----------|--------|
| id | User ID |
| name | User's name |
| email | User's email address |

Each column has a data type:

```sql
email VARCHAR(255)
age INT
created_at TIMESTAMP
```

---

## 4. Schema

A schema defines the structure of a table:

- Which columns exist
- What data types they have

Example:

```sql
CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    email VARCHAR(255)
);
```

This says:

- `id` is an integer
- `name` is text
- `email` is text

You can think of a schema as the **blueprint of a table**.

---

## 5. Query

A query is simply an instruction given to the database.

### Read Data

```sql
SELECT * FROM users;
```

Meaning:

> "Show me all users."

---

### Insert Data

```sql
INSERT INTO users VALUES (1, 'Mukul', 'mukul@gmail.com');
```

Meaning:

> "Add a new user."

---

### Update Data

```sql
UPDATE users
SET name = 'Rahul'
WHERE id = 1;
```

Meaning:

> "Change the name of user 1."

---

### Delete Data

```sql
DELETE FROM users
WHERE id = 1;
```

Meaning:

> "Remove user 1."

---

# Popular Relational Databases

| Database | Used By | Known For |
|------------|---------|------------|
| PostgreSQL | Instagram, Uber, Reddit, Stripe | Feature-rich and reliable |
| MySQL | Facebook, YouTube, Shopify | Fast and widely used |
| SQL Server | Microsoft, Stack Overflow | Enterprise features |
| Oracle | Banks and large companies | Very powerful but expensive |
| SQLite | Mobile apps and embedded systems | Lightweight and serverless |

---

# When Should You Use a Relational Database?

### 1. Data has relationships

Example:

```
Users
   ↓
Posts
   ↓
Comments
```

A user creates posts, and posts have comments.

---

### 2. You need strong consistency (ACID)

Important for:

- Payments
- Banking
- Inventory systems
- Order processing

Example:

If ₹100 is transferred from Account A to Account B:

Either:

- Both operations succeed

or

- Nothing happens

No partial updates are allowed.

---

### 3. You need complex queries

Example:

**"Find the top 10 users who wrote the most posts this month."**

SQL databases are very good at these kinds of queries.

---

### 4. The structure of data doesn't change often

For example:

Every user will always have:

- id
- name
- email

Since the structure is stable, SQL databases work very well.

---

# Real-World Example

Suppose you're building Instagram.

You may have three tables:

### Users

| id | name |
|----|------|
| 1 | Mukul |
| 2 | Priya |

### Posts

| id | user_id | caption |
|----|---------|---------|
| 101 | 1 | Vacation |
| 102 | 2 | Coffee Time |

### Comments

| id | post_id | text |
|----|---------|------|
| 201 | 101 | Nice pic! |

Relationships:

```
User
  ↓
Posts
  ↓
Comments
```

This interconnected data is why they're called **Relational Databases**.

---

# Interview Tip

Unless there is a special requirement, **PostgreSQL is usually the default choice in system design interviews** because:

- Reliable
- Feature-rich
- Supports ACID transactions
- Handles complex queries well
- Widely used in production systems

---

# One-Line Summary

> A Relational Database (SQL) stores data in tables with a fixed structure and is ideal when data is related, consistency is important, and complex queries are required.
````
