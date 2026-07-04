I love this approach.

One thing I want to change before we start.

## Let's not build a "project".

Let's build a **real product**.

That means we'll work like a team at Google or Microsoft.

We'll have:

* Feature branches
* Clean commits
* Proper architecture
* Design decisions
* Documentation
* API contracts
* Code reviews (I'll review your code)
* Refactoring
* Performance profiling
* Testing
* Production deployment

At the end, you'll not only have a GitHub repo—you'll have something you can confidently discuss for an hour in an interview.

---

# Before we write code

We need a Product Requirements Document (PRD).

Senior engineers don't start coding immediately.

## Product Name

Let's call it **SyncSpace**.

> **SyncSpace** is an offline-first collaborative document platform inspired by Google Docs and Notion. Users can create, organize, and edit documents in real time. The application continues to function without internet access and automatically synchronizes local changes once connectivity is restored.

This will also be the description in your GitHub repository.

---

# Milestone 1 — Foundation

This week, we'll only build the foundation.

## Goal

By the end of this milestone:

* Users can sign up
* Users can log in
* JWT authentication works
* Refresh tokens work
* Users can create workspaces
* Users can create documents
* Users can open documents
* Everything is deployed

No collaboration.

No offline support.

No WebSockets.

No Redis.

Just a solid base.

---

# Tech Stack

## Frontend

```
React 18
TypeScript
Vite
CSS Modules
React Router
TanStack Query
Zustand
Axios
React Hook Form
Zod
Lexical
```

## Backend

```
Node.js
Express
TypeScript
Prisma
PostgreSQL
```

---

# Folder Structure

Create a new folder.

```
syncspace/
```

Inside it:

```
syncspace/
│
├── client/
├── server/
├── docs/
├── .gitignore
├── README.md
└── docker-compose.yml
```

Notice something.

Even before coding,

this already looks like a professional repository.

---

# Git

Initialize Git.

```
git init
```

Create your first branch.

```
main
```

Then

```
develop
```

From now on,

every feature gets its own branch.

Example:

```
feature/authentication
feature/workspace
feature/editor
feature/offline
```

This mirrors how most engineering teams work.

---

# Backend Setup

Inside

```
server/
```

Run

```bash
npm init -y
```

Install dependencies:

```bash
npm install express cors helmet morgan dotenv cookie-parser jsonwebtoken bcrypt prisma @prisma/client zod
```

Development dependencies:

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcrypt @types/cookie-parser @types/cors @types/morgan
```

Initialize TypeScript:

```bash
npx tsc --init
```

Initialize Prisma:

```bash
npx prisma init
```

---

# Frontend Setup

Inside

```
client/
```

Create the app:

```bash
npm create vite@latest
```

Choose:

```
React

TypeScript
```

Install dependencies:

```bash
npm install react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers lexical @lexical/react
```

---

# Install Developer Tools

In both projects:

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks husky lint-staged
```

Why?

Every serious codebase should have:

* linting
* formatting
* pre-commit checks

before any business logic.

---

# Create Documentation

Inside

```
docs/
```

Create:

```
architecture.md

database.md

api.md

decisions.md
```

This is something many personal projects skip, but it demonstrates engineering discipline.

---

# Backend Folder Structure

```
server/src/

config/

controllers/

middlewares/

models/

repositories/

routes/

services/

types/

utils/

validators/

prisma/

app.ts

server.ts
```

Notice there is **no business logic in controllers**. Controllers will only receive the request, validate it, call the appropriate service, and return the response.

---

# Frontend Folder Structure

```
client/src/

app/

features/

shared/

routes/

services/

hooks/

types/

assets/

styles/
```

Inside `features/` we'll later have:

```
auth/
workspace/
editor/
search/
collaboration/
offline/
history/
```

This feature-based structure scales much better than organizing by `components/`, `pages/`, and `utils/` alone.

---

# Authentication Flow

Before writing any authentication code, understand the flow:

```
User

↓

Login

↓

Server validates credentials

↓

Generate Access Token (15 minutes)

↓

Generate Refresh Token (7 days)

↓

Store Refresh Token securely

↓

Return Access Token

↓

Frontend stores auth state

↓

Every API call includes the Access Token

↓

If Access Token expires

↓

Use Refresh Token

↓

Get a new Access Token

↓

Continue without logging in again
```

We'll discuss why we use both access and refresh tokens, where to store them, and how to protect them before implementing them.

---

# Database (initial)

We'll start with just three tables:

```
User

Workspace

Document
```

That's all.

We'll add:

* DocumentVersion
* SyncQueue
* Activity
* SearchIndex

later, when the features require them.

---

# What I want from you before we continue

I don't want to just give you code to paste. The goal is for you to understand every design decision.

So for **Milestone 1**, I'd like you to:

1. Create the `syncspace` repository with the folder structure above.
2. Initialize both the `client` and `server` projects.
3. Install the dependencies.
4. Commit the initial setup on a branch named `feature/authentication`.

Once you've done that, tell me where you are (or share any errors if you hit them). Then we'll move on to designing the authentication system itself—starting with the database schema, token strategy, folder responsibilities, and API contracts before writing the first line of authentication code. This way, you'll understand not just *how* it works, but *why* it's designed that way.
