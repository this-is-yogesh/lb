
# Primary Keys and Foreign Keys

These are two of the most important concepts in relational databases because they help us uniquely identify data and connect tables together.

---

# Primary Key

A **Primary Key** is a column (or set of columns) that uniquely identifies each row in a table.

Think of it as a person's Aadhaar number.

- Everyone has one.
- No two people can have the same Aadhaar number.
- It can never be empty (NULL).

---

## Example: Users Table

```sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(30)
);
```

### Users Table

| user_id | username |
|----------|----------|
| 1 | Mukul |
| 2 | Priya |
| 3 | John |

Here:

```text
user_id
```

is the **Primary Key**.

Why?

Because:

- Every user has a different ID.
- IDs cannot repeat.
- IDs cannot be NULL.

---

# Why Do We Need a Primary Key?

Suppose usernames are used instead:

| username |
|-----------|
| Mukul |
| Mukul |
| Priya |

Now if we ask:

> "Delete Mukul"

Which Mukul should be deleted?

Impossible to know.

With a primary key:

| user_id | username |
|----------|----------|
| 101 | Mukul |
| 102 | Mukul |

We can say:

```text
Delete user 101
```

No confusion.

---

# Composite Primary Key

Sometimes one column alone is not enough.

Instead, two or more columns together form the primary key.

---

## Example: Instagram Follow Table

```sql
CREATE TABLE follows (
    follower_id BIGINT,
    followee_id BIGINT,

    PRIMARY KEY (follower_id, followee_id)
);
```

---

### Follows Table

| follower_id | followee_id |
|-------------|-------------|
| 1 | 2 |
| 1 | 5 |
| 2 | 1 |
| 3 | 2 |

Each row means:

```text
User 1 follows User 2
User 1 follows User 5
User 2 follows User 1
```

---

## What Does

```sql
PRIMARY KEY (follower_id, followee_id)
```

Mean?

The **combination** must be unique.

Allowed:

| follower_id | followee_id |
|-------------|-------------|
| 1 | 2 |
| 1 | 5 |
| 2 | 1 |

Not Allowed:

| follower_id | followee_id |
|-------------|-------------|
| 1 | 2 |
| 1 | 2 ❌ |

Because User 1 should follow User 2 only once.

---

# Foreign Key

A **Foreign Key** connects two tables.

It says:

> "This value must already exist in another table."

---

## Users Table

| user_id | username |
|----------|----------|
| 1 | Mukul |
| 2 | Priya |
| 3 | John |

---

## Posts Table

| post_id | user_id | caption |
|----------|---------|---------|
| 101 | 1 | Vacation |
| 102 | 2 | Coffee Time |

Notice:

```text
user_id
```

inside the posts table points to:

```text
user_id
```

inside the users table.

This connection is called a **Foreign Key**.

---

## SQL Example

```sql
CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    caption TEXT,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);
```

---

# Visual Representation

```text
Users Table
+---------+---------+
| user_id | username|
+---------+---------+
|    1    | Mukul   |
|    2    | Priya   |
+---------+---------+
      ↑
      |
      | Foreign Key Relationship
      |
Posts Table
+---------+---------+-------------+
| post_id | user_id | caption     |
+---------+---------+-------------+
| 101     |    1    | Vacation    |
| 102     |    2    | Coffee Time |
+---------+---------+-------------+
```

Each post belongs to a valid user.

---

# What Does the Database Enforce?

Suppose the users table contains:

| user_id |
|---------|
| 1 |
| 2 |
| 3 |

Now we try:

```sql
INSERT INTO posts
VALUES (103, 999, 'Hello');
```

Database checks:

```text
Does user_id = 999 exist?
```

No.

Therefore:

```text
Insertion fails ❌
```

Because user 999 doesn't exist.

This prevents bad data.

---

# ON DELETE CASCADE

Example:

```sql
CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY,
    user_id BIGINT,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
```

---

Suppose:

### Users

| user_id | username |
|----------|----------|
| 1 | Mukul |

### Posts

| post_id | user_id |
|----------|---------|
| 101 | 1 |
| 102 | 1 |

---

Now we delete user 1:

```sql
DELETE FROM users
WHERE user_id = 1;
```

Because of:

```sql
ON DELETE CASCADE
```

Database automatically deletes:

| post_id | user_id |
|----------|---------|
| 101 | 1 |
| 102 | 1 |

---

### Result

User disappears.

All their posts disappear too.

No orphaned data remains.

---

# What Are Orphaned Records?

Suppose there is no foreign key.

Users table:

| user_id |
|---------|
| 1 |

Posts table:

| post_id | user_id |
|---------|---------|
| 101 | 1 |

Delete user 1:

Users table:

(empty)

Posts table:

| post_id | user_id |
|---------|---------|
| 101 | 1 |

Now post 101 belongs to a user that no longer exists.

This is called an **orphaned record**.

Foreign keys prevent this.

---

# Without Foreign Keys

Application code must do everything manually:

```text
Before creating a post:
    Check if user exists.

When deleting a user:
    Delete all posts manually.
```

If a developer forgets, inconsistent data appears.

---

# With Foreign Keys

Database automatically ensures:

✅ Every post belongs to an existing user.

✅ Invalid data cannot be inserted.

✅ Relationships remain consistent.

✅ Cascading deletes remove dependent records.

---

# Real Instagram Example

```text
Users
   ↑
Posts
   ↑
Comments
   ↑
Likes
```

Relationships:

```text
User 1
    ↓
Post 101
    ↓
Comment 500
    ↓
Like 900
```

Foreign keys maintain these connections.

---

# Trade-Off at Huge Scale

Foreign key checks add some overhead.

At extremely large systems:

- Billions of writes per day
- Massive traffic

Companies sometimes disable foreign key constraints.

Instead, the application layer maintains consistency.

Example:

```text
Instagram
Facebook
Twitter
```

may rely more on application logic rather than database-enforced foreign keys.

This is done for performance reasons.

### But this is an advanced optimization.

For most systems:

> **Always use foreign keys unless you have a very good reason not to.**

---

# Interview Tip

### Primary Key

Answers:

> "Uniquely identifies each row."

Examples:

- `user_id`
- `post_id`
- `comment_id`

---

### Foreign Key

Answers:

> "Creates relationships between tables and ensures referenced data exists."

Examples:

- `posts.user_id → users.user_id`
- `comments.post_id → posts.post_id`

---

# One-Line Summary

> A Primary Key uniquely identifies a row, while a Foreign Key connects tables together and ensures the relationships between them remain valid.
````
