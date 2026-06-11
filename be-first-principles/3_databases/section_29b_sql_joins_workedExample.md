
# SQL Joins: Worked Example (Building an Instagram Feed)

This example shows the true power of relational databases.

To build Instagram's feed, we need information from multiple tables:

- Who does the user follow?
- What posts have those users created?
- Who is the author of each post?
- Has the current user liked each post?

Instead of making many separate queries, SQL can combine everything in one query using joins.

---

# Tables Involved

## Users

Stores user information.

| user_id | username |
|---------|----------|
| 1 | Alice |
| 2 | Bob |
| 3 | Carol |

---

## Follows

Stores who follows whom.

| follower_id | followee_id |
|-------------|-------------|
| 123 | 1 |
| 123 | 2 |

This means:

```text
User 123 follows Alice and Bob.
```

---

## Posts

Stores posts.

| post_id | user_id | caption |
|---------|---------|---------|
| 10 | 1 | Vacation |
| 11 | 2 | Coffee Time |

---

## Likes

Stores which users liked which posts.

| user_id | post_id |
|---------|---------|
| 123 | 10 |

Meaning:

```text
User 123 liked post 10.
```

---

# Goal

We want to show the feed for user 123.

For every post we need:

- Caption
- Image
- Author's username
- Profile picture
- Like count
- Comment count
- Whether user 123 liked the post

---

# The SQL Query

```sql
SELECT
    p.post_id,
    p.caption,
    p.image_url,
    p.created_at,
    p.like_count,
    p.comment_count,
    u.username,
    u.profile_pic_url,
    CASE WHEN l.user_id IS NOT NULL
         THEN true
         ELSE false
    END AS liked_by_me

FROM follows f

INNER JOIN posts p
ON f.followee_id = p.user_id

INNER JOIN users u
ON p.user_id = u.user_id

LEFT JOIN likes l
ON p.post_id = l.post_id
AND l.user_id = 123

WHERE f.follower_id = 123

ORDER BY p.created_at DESC

LIMIT 20;
```

---

# Step 1: Find Who User 123 Follows

We begin with:

```sql
FROM follows f
WHERE f.follower_id = 123
```

Suppose:

### Follows Table

| follower_id | followee_id |
|-------------|-------------|
| 123 | 1 |
| 123 | 2 |

This tells us:

```text
User 123 follows:

User 1 (Alice)
User 2 (Bob)
```

---

# Step 2: Get Posts From Those Users

```sql
INNER JOIN posts p
ON f.followee_id = p.user_id
```

---

### Posts Table

| post_id | user_id | caption |
|---------|---------|---------|
| 10 | 1 | Vacation |
| 11 | 2 | Coffee Time |
| 12 | 3 | Gym |

---

Since user 123 follows users 1 and 2:

We get:

| post_id | user_id | caption |
|---------|---------|---------|
| 10 | 1 | Vacation |
| 11 | 2 | Coffee Time |

Post 12 is excluded because user 123 doesn't follow user 3.

---

# Step 3: Get Author Information

Posts only contain:

```text
user_id
```

But the feed also needs:

- Username
- Profile picture

So we join with the users table:

```sql
INNER JOIN users u
ON p.user_id = u.user_id
```

---

### Users Table

| user_id | username |
|---------|---------|
| 1 | Alice |
| 2 | Bob |

---

Now we get:

| post_id | caption | username |
|---------|---------|---------|
| 10 | Vacation | Alice |
| 11 | Coffee Time | Bob |

---

# Step 4: Check Whether User 123 Liked Each Post

Likes table:

| user_id | post_id |
|---------|---------|
| 123 | 10 |

Meaning:

```text
User 123 liked post 10.
```

---

We use:

```sql
LEFT JOIN likes l
ON p.post_id = l.post_id
AND l.user_id = 123
```

---

## Why LEFT JOIN?

Because most posts won't be liked.

Suppose:

### Posts

| post_id |
|---------|
| 10 |
| 11 |

### Likes

| user_id | post_id |
|---------|---------|
| 123 | 10 |

---

### LEFT JOIN Result

| post_id | l.user_id |
|---------|---------|
| 10 | 123 |
| 11 | NULL |

Post 11 still appears.

If we used INNER JOIN:

```text
Post 11 would disappear!
```

which is wrong.

---

# Step 5: Convert NULL Into True or False

```sql
CASE WHEN l.user_id IS NOT NULL
THEN true
ELSE false
END AS liked_by_me
```

---

### For Post 10

```text
l.user_id = 123
```

Result:

```text
liked_by_me = true
```

---

### For Post 11

```text
l.user_id = NULL
```

Result:

```text
liked_by_me = false
```

---

# Step 6: Sort By Newest Posts

```sql
ORDER BY p.created_at DESC
```

DESC means descending order.

Newest posts come first.

Example:

| Post | Time |
|------|------|
| Coffee Time | 7 PM |
| Vacation | 5 PM |

Result:

```text
Coffee Time
Vacation
```

---

# Step 7: Return Only 20 Posts

```sql
LIMIT 20
```

Even if there are 50,000 posts:

Only the latest 20 are returned.

This is pagination.

---

# Final Output

The feed returned might look like:

| post_id | caption | username | liked_by_me |
|---------|---------|---------|---------|
| 11 | Coffee Time | Bob | false |
| 10 | Vacation | Alice | true |

This is exactly what Instagram needs to render your home page.

---

# Visual Flow

```text
User 123
     |
     ↓
Follows Table
     |
     ↓
Users Followed
(1,2)
     |
     ↓
Posts Table
     |
     ↓
Posts From Those Users
     |
     ↓
Users Table
     |
     ↓
Author Information
     |
     ↓
Likes Table
     |
     ↓
liked_by_me = true/false
     |
     ↓
Sort By Time
     |
     ↓
Return Top 20
```

---

# Why Is This Powerful?

In one SQL query, we combined information from:

1. Follows table
2. Posts table
3. Users table
4. Likes table

Without joins, we would need many separate queries and manual processing.

This ability to combine related data is the biggest strength of relational databases.

---

# Performance Concern

This query touches four tables.

In production, each table may contain:

```text
Users      → billions of rows
Posts      → billions of rows
Follows    → trillions of rows
Likes      → trillions of rows
```

Without indexes:

```text
Query time = seconds ❌
```

With proper indexes:

```text
Query time = milliseconds ✅
```

This is why indexing is one of the most important topics in databases.

---

# Interview Tip

When someone asks:

> "How does Instagram build a feed?"

Think:

```text
Follows
    ↓
Posts
    ↓
Users
    ↓
Likes
```

and combine them using joins.

---

# One-Line Summary

> SQL joins allow us to combine information from multiple tables and build complex features like Instagram feeds using a single query.
````
