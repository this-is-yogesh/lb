
# SQL Joins

A **JOIN** combines data from multiple tables based on a common column.

Think of joins as answering questions like:

> "Show me each user along with their posts."

The database takes rows from two tables and combines them into one result.

---

# Example Tables

## Users Table

| user_id | username |
|----------|----------|
| 1 | Alice |
| 2 | Bob |
| 3 | Carol |

---

## Posts Table

| post_id | user_id | caption |
|---------|---------|---------|
| 10 | 1 | Hello |
| 11 | 1 | World |
| 12 | 2 | Hi |

Notice:

```text
posts.user_id
```

points to

```text
users.user_id
```

which allows us to connect the two tables.

---

# Why Do We Need Joins?

Without joins:

1. Query users table.
2. Query posts table.
3. Manually combine results.

With joins:

The database does all of this automatically in one query.

---

# INNER JOIN

An **INNER JOIN** returns only rows that have a match in both tables.

### SQL

```sql
SELECT users.username, posts.caption
FROM users
INNER JOIN posts
ON users.user_id = posts.user_id;
```

---

## Step-by-Step Matching

### User Alice (id = 1)

Posts table contains:

```text
user_id = 1
```

Matches found:

```text
Hello
World
```

---

### User Bob (id = 2)

Match found:

```text
Hi
```

---

### User Carol (id = 3)

No matching post exists.

Therefore, Carol is excluded.

---

## Result

| username | caption |
|-----------|---------|
| Alice | Hello |
| Alice | World |
| Bob | Hi |

---

# Easy Way To Remember INNER JOIN

> **Only keep rows that exist in BOTH tables.**

```text
Users ∩ Posts
```

Intersection.

---

# LEFT JOIN

A **LEFT JOIN** keeps everything from the left table.

If there is no match in the right table, SQL fills the columns with `NULL`.

---

### SQL

```sql
SELECT users.username, posts.caption
FROM users
LEFT JOIN posts
ON users.user_id = posts.user_id;
```

---

## Matching Process

### Alice

Matches:

```text
Hello
World
```

---

### Bob

Match:

```text
Hi
```

---

### Carol

No post exists.

Instead of removing Carol, SQL returns:

```text
NULL
```

---

## Result

| username | caption |
|-----------|---------|
| Alice | Hello |
| Alice | World |
| Bob | Hi |
| Carol | NULL |

---

# Easy Way To Remember LEFT JOIN

> **Keep ALL rows from the left table.**

```text
LEFT table + matching rows from right table
```

Missing matches become:

```text
NULL
```

---

# RIGHT JOIN

A **RIGHT JOIN** keeps every row from the right table.

Missing values from the left side become `NULL`.

---

### SQL

```sql
SELECT users.username, posts.caption
FROM users
RIGHT JOIN posts
ON users.user_id = posts.user_id;
```

---

Since every post belongs to a user, the result here would be:

| username | caption |
|-----------|---------|
| Alice | Hello |
| Alice | World |
| Bob | Hi |

---

### Interview Tip

RIGHT JOIN is rarely used.

Most developers rewrite it as a LEFT JOIN.

---

# FULL OUTER JOIN

A **FULL OUTER JOIN** keeps everything from both tables.

If a row has no matching partner, SQL fills the missing side with `NULL`.

---

Suppose:

### Users

| user_id | username |
|---------|----------|
| 1 | Alice |
| 2 | Bob |
| 3 | Carol |

### Posts

| post_id | user_id | caption |
|---------|---------|---------|
| 10 | 1 | Hello |
| 11 | 1 | World |
| 12 | 2 | Hi |
| 13 | 4 | Random |

Notice:

Post 13 belongs to user 4, but user 4 doesn't exist.

---

## FULL OUTER JOIN Result

| username | caption |
|-----------|---------|
| Alice | Hello |
| Alice | World |
| Bob | Hi |
| Carol | NULL |
| NULL | Random |

---

# Easy Way To Remember

### INNER JOIN

```text
Only common rows
```

```
Users ∩ Posts
```

---

### LEFT JOIN

```text
Everything from LEFT table
+
Matching rows from RIGHT table
```

---

### RIGHT JOIN

```text
Everything from RIGHT table
+
Matching rows from LEFT table
```

---

### FULL OUTER JOIN

```text
Everything from BOTH tables
```

---

# Visual Representation

## Users Table

```text
+---------+--------+
| user_id | name   |
+---------+--------+
| 1       | Alice  |
| 2       | Bob    |
| 3       | Carol  |
+---------+--------+
```

## Posts Table

```text
+---------+---------+---------+
| post_id | user_id | caption |
+---------+---------+---------+
| 10      | 1       | Hello   |
| 11      | 1       | World   |
| 12      | 2       | Hi      |
+---------+---------+---------+
```

---

## INNER JOIN

```text
+-------+---------+
| name  | caption |
+-------+---------+
| Alice | Hello   |
| Alice | World   |
| Bob   | Hi      |
+-------+---------+
```

Carol disappears because she has no posts.

---

## LEFT JOIN

```text
+-------+---------+
| name  | caption |
+-------+---------+
| Alice | Hello   |
| Alice | World   |
| Bob   | Hi      |
| Carol | NULL    |
+-------+---------+
```

Carol remains because LEFT JOIN keeps all users.

---

# Real Instagram Example

Suppose we want:

> "Show every post along with the username of the person who created it."

---

### Users

| user_id | username |
|---------|---------|
| 1 | Alice |
| 2 | Bob |

---

### Posts

| post_id | user_id | caption |
|---------|---------|---------|
| 101 | 1 | Vacation |
| 102 | 2 | Coffee |

---

### Query

```sql
SELECT users.username, posts.caption
FROM users
INNER JOIN posts
ON users.user_id = posts.user_id;
```

---

### Result

| username | caption |
|-----------|---------|
| Alice | Vacation |
| Bob | Coffee |

The database automatically combines the two tables.

---

# Interview Tip

When you hear:

> "Get user information together with post information"

you should immediately think:

```text
JOIN
```

because joins are the superpower of relational databases.

---

# Summary Table

| Join Type | Returns |
|------------|---------|
| INNER JOIN | Only matching rows |
| LEFT JOIN | All rows from left table + matches from right |
| RIGHT JOIN | All rows from right table + matches from left |
| FULL OUTER JOIN | All rows from both tables |

---

# One-Line Summary

> A JOIN combines rows from multiple tables using a common column, allowing relational databases to answer complex questions in a single query.
````
