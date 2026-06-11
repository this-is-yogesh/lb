# SQL Schema Example: Designing a Users Table

A **schema** is the blueprint of a table.

It defines:

- What columns exist
- What type of data each column stores
- Rules and constraints on the data

For example, a `users` table might look like this:

```sql
CREATE TABLE users (
    user_id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    username        VARCHAR(30) UNIQUE NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(100),
    bio             TEXT,
    profile_pic_url VARCHAR(500),
    follower_count  INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP
);
```

---

# Understanding Each Column

## 1. user_id

```sql
user_id BIGINT PRIMARY KEY AUTO_INCREMENT
```

Example:

```text
1
2
3
4
...
```

### Why BIGINT?

Because a global application can have billions of users.

### Capacity Comparison

| Type | Maximum Value |
|--------|---------------|
| INTEGER | ~2.1 billion |
| BIGINT | ~9.2 quintillion |

Since platforms like Instagram have billions of users, **BIGINT is the safer choice**.

### PRIMARY KEY

This uniquely identifies every user.

No two users can have the same `user_id`.

### AUTO_INCREMENT

The database automatically generates IDs:

```text
1
2
3
4
...
```

You don't have to assign them manually.

---

## 2. username

```sql
username VARCHAR(30) UNIQUE NOT NULL
```

Example:

```text
mukul123
john_doe
alex99
```

### VARCHAR(30)

Stores text up to 30 characters.

### UNIQUE

No two users can have the same username.

Allowed:

```text
mukul123
john123
```

Not allowed:

```text
mukul123
mukul123
```

### NOT NULL

Every user must have a username.

Empty values are not allowed.

---

## 3. email

```sql
email VARCHAR(255) UNIQUE NOT NULL
```

Example:

```text
mukul@gmail.com
john@yahoo.com
```

### Why 255?

255 characters is the maximum email length according to standards.

### UNIQUE

Each email can belong to only one account.

---

## 4. password_hash

```sql
password_hash VARCHAR(255) NOT NULL
```

Suppose the user enters:

```text
myPassword123
```

We should NEVER store:

```text
myPassword123
```

Instead, we store something like:

```text
$2b$12$XJdsk8h3j...
```

This is called a **hashed password**.

### Why?

If the database gets hacked, attackers won't see users' real passwords.

---

# Never Store Plain Passwords

❌ Wrong

```sql
password VARCHAR(255)
```

✔ Correct

```sql
password_hash VARCHAR(255)
```

Common hashing algorithms:

- bcrypt
- Argon2

---

## 5. full_name

```sql
full_name VARCHAR(100)
```

Example:

```text
Mukul Sharma
John Smith
```

Stores the user's display name.

---

## 6. bio

```sql
bio TEXT
```

Example:

```text
Love travelling ✈️
Software Engineer
Coffee addict ☕
```

### Why TEXT instead of VARCHAR?

Bios can vary greatly in length.

TEXT allows flexible storage without worrying about a strict size limit.

---

## 7. profile_pic_url

```sql
profile_pic_url VARCHAR(500)
```

Example:

```text
https://s3.amazonaws.com/images/user123.jpg
```

Notice that we're storing the **URL**, not the image itself.

---

# Where Is The Actual Image Stored?

```
User Table
      ↓
profile_pic_url
      ↓
S3 Storage
      ↓
Actual Image File
```

The database only stores a pointer to the image.

### Why?

Databases are optimized for structured data, not large image files.

---

# Never Store Images As BLOBs

❌ Wrong

```sql
profile_pic BLOB
```

✔ Correct

```sql
profile_pic_url VARCHAR(500)
```

Image lives in:

- S3
- Object storage
- CDN

The database stores only the URL.

---

## 8. follower_count

```sql
follower_count INTEGER DEFAULT 0
```

Initially:

```text
0
```

As people follow:

```text
15
234
1500
```

### DEFAULT 0

New users start with:

```text
0 followers
```

without us manually setting it.

---

## 9. following_count

```sql
following_count INTEGER DEFAULT 0
```

Tracks how many users this person follows.

Example:

```text
500
1200
50
```

---

## 10. created_at

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

Suppose a user signs up at:

```text
June 10, 2026 6:30 PM
```

The database automatically stores:

```text
2026-06-10 18:30:00
```

No manual work required.

---

## 11. updated_at

```sql
updated_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP
```

Whenever the user edits their profile:

- Changes bio
- Changes profile picture
- Updates name

The database automatically updates this timestamp.

Example:

```text
2026-06-10 19:15:00
```

---

# Column Design Summary

| Column | Why? |
|----------|------|
| user_id | Unique identifier for each user |
| username | User's unique public name |
| email | Unique email address |
| password_hash | Securely stores passwords |
| full_name | User's display name |
| bio | Flexible-length description |
| profile_pic_url | Points to image stored in S3 |
| follower_count | Number of followers |
| following_count | Number of accounts followed |
| created_at | Account creation time |
| updated_at | Last modification time |

---

# Common Interview Mistakes

## Mistake 1: Using INTEGER for IDs

❌

```sql
user_id INTEGER
```

Maximum:

```text
2.1 billion
```

Large systems may eventually run out of IDs.

✔ Better

```sql
user_id BIGINT
```

Supports enormous scale.

---

## Mistake 2: Storing Plain Passwords

❌

```sql
password VARCHAR(255)
```

If the database is leaked, all passwords become visible.

✔ Better

```sql
password_hash VARCHAR(255)
```

Store encrypted hashes instead.

---

## Mistake 3: Storing Images Inside The Database

❌

```sql
profile_pic BLOB
```

Large binary files make databases slow and expensive.

✔ Better

```sql
profile_pic_url VARCHAR(500)
```

Store images in:

- S3
- Object storage
- CDN

Store only the URL in the database.

---

# Interview Tip

When designing schemas for large systems:

1. Use **BIGINT** for IDs.
2. Never store plaintext passwords.
3. Store image URLs, not image files.
4. Use timestamps for creation and updates.
5. Add constraints like:

- `PRIMARY KEY`
- `UNIQUE`
- `NOT NULL`

These rules make your database safer, cleaner, and easier to scale.

---

# One-Line Summary

> A schema is the blueprint of a table, and good schema design means choosing the right data types, constraints, and storage strategy to make the system secure and scalable.
````
