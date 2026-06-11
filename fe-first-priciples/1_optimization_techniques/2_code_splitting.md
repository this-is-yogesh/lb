
# Code Splitting — Explained Simply

## What Problem Does Code Splitting Solve?

Imagine your React application contains:

- Home page
- Login page
- Profile page
- Dashboard page
- Admin page
- Settings page
- Charts library
- PDF library

Without code splitting, **all of this JavaScript is downloaded immediately**, even though the user initially visits only the Home page.

```
User opens Home page
            ↓
Download EVERYTHING
```

This makes the initial page load slower.

---

# Real-Life Analogy

Imagine ordering food in a restaurant.

Without code splitting:

```
You order:

Soup
Pizza
Dessert
Coffee
Ice Cream

Everything arrives at once.
```

But you're only eating the soup right now.

---

With code splitting:

```
Serve soup first.

When finished →
Serve pizza.

Later →
Serve dessert.
```

You only get things when you need them.

---

# Definition

> Code splitting is an optimization technique that breaks a large JavaScript bundle into smaller chunks and loads those chunks only when they are needed.

---

# Without Code Splitting

Suppose your application has:

```
Home
Profile
Dashboard
Admin
Charts
PDF Generator
```

Bundle:

```
app.js
│
├── Home
├── Profile
├── Dashboard
├── Admin
├── Charts
└── PDF Generator
```

Size:

```
2 MB
```

User visits Home page.

But browser downloads:

```
Entire 2 MB
```

even though Home needs only:

```
200 KB
```

---

# With Code Splitting

Initial bundle:

```
Home
```

Size:

```
200 KB
```

Additional chunks:

```
dashboard.chunk.js
admin.chunk.js
charts.chunk.js
pdf.chunk.js
```

These are downloaded only when needed.

---

Visual representation:

```
Initial Load
│
└── home.js

Later
│
├── dashboard.js
├── admin.js
├── charts.js
└── pdf.js
```

---

# Example

Suppose:

```javascript
Home
Dashboard
Admin
Settings
```

Without code splitting:

```
main.js

Home
Dashboard
Admin
Settings
```

Size:

```
1 MB
```

Downloaded immediately.

---

With code splitting:

Initial:

```
main.js

Home
```

When user clicks Dashboard:

```
dashboard.chunk.js
```

is downloaded.

When user clicks Admin:

```
admin.chunk.js
```

is downloaded.

---

# React Example

Normal import:

```javascript
import Dashboard from "./Dashboard";
```

This means:

> Include Dashboard in the main bundle.

---

Using lazy loading:

```javascript
const Dashboard = React.lazy(() =>
    import("./Dashboard")
);
```

Now Dashboard becomes a separate chunk.

It is downloaded only when required.

---

# What Happens Internally?

Suppose:

### App.js

```javascript
import Home from "./Home";

const Dashboard = React.lazy(() =>
    import("./Dashboard")
);
```

Bundler creates:

```
main.js
dashboard.chunk.js
```

---

When app starts:

Browser downloads:

```
main.js
```

only.

---

When user navigates to Dashboard:

Browser requests:

```
dashboard.chunk.js
```

and loads it dynamically.

---

# Visual Flow

Without code splitting:

```
User opens app
        ↓
Download 2 MB
        ↓
Show Home page
```

---

With code splitting:

```
User opens app
        ↓
Download 200 KB
        ↓
Show Home page instantly

User visits Dashboard
        ↓
Download Dashboard chunk
```

---

# Route-Based Code Splitting

Most common type.

Suppose:

```
/
Home

/dashboard
Dashboard

/profile
Profile

/admin
Admin
```

Chunks:

```
home.chunk.js
dashboard.chunk.js
profile.chunk.js
admin.chunk.js
```

Each page loads only when visited.

---

# Example Using React Router

```javascript
const Home = lazy(() => import("./Home"));
const Dashboard = lazy(() => import("./Dashboard"));
const Profile = lazy(() => import("./Profile"));
```

Now every page becomes its own chunk.

---

# Component-Based Code Splitting

Suppose a page contains a heavy chart component.

```javascript
Dashboard
│
├── Statistics
├── Summary
└── HugeChart
```

Maybe users don't always view the chart.

Instead of loading everything:

```javascript
const HugeChart = lazy(() =>
    import("./HugeChart")
);
```

Load the chart only when needed.

---

# Example: Modal

Normal:

```javascript
import PaymentModal from "./PaymentModal";
```

PaymentModal is downloaded immediately.

---

Better:

```javascript
const PaymentModal = React.lazy(() =>
    import("./PaymentModal")
);
```

Load it only when user clicks:

```javascript
Pay Now
```

---

# Example: Admin Panel

95% of users never visit admin pages.

Without code splitting:

Everyone downloads:

```
admin.js
```

wasting bandwidth.

---

With code splitting:

Only admins download:

```
admin.chunk.js
```

---

# Example: PDF Library

Libraries like:

```javascript
jspdf
```

are large.

Without splitting:

```
main.js
+ jsPDF
```

for every user.

---

Better:

```javascript
async function generatePDF() {
    const jsPDF = await import("jspdf");
}
```

Only users who click:

```
Download PDF
```

download the library.

---

# What Does Webpack/Vite Do?

When it encounters:

```javascript
import("./Dashboard")
```

it says:

> "This should become a separate file."

It generates:

```
main.js
dashboard.chunk.js
```

and automatically loads the chunk when required.

---

# Code Splitting vs Tree Shaking

## Tree Shaking

Removes unused code.

Example:

```
Library

add()
subtract()
multiply()
```

Using:

```javascript
add()
```

Result:

```
add()
```

only.

---

## Code Splitting

Keeps all code, but delays loading.

Example:

```
Home
Dashboard
Admin
```

All pages still exist.

But:

```
Home loaded now

Dashboard loaded later

Admin loaded later
```

---

# Visual Difference

Tree Shaking:

```
Before

A B C D E

After

A B
```

Unused code removed.

---

Code Splitting:

```
Chunk 1

A B

Chunk 2

C D

Chunk 3

E
```

Nothing removed.

Just loaded separately.

---

# Benefits

### Faster Initial Load

Smaller first bundle.

---

### Better Performance

Less JavaScript to parse.

---

### Reduced Memory Usage

Load features only when needed.

---

### Better User Experience

Page appears faster.

---

### Saves Bandwidth

Users download only what they actually use.

---

# Complete Flow

```
Application
       ↓

Webpack / Vite
       ↓

Split Bundle Into Chunks

main.js
dashboard.chunk.js
admin.chunk.js
chart.chunk.js

       ↓

Initial page downloads main.js

       ↓

User visits dashboard

       ↓

dashboard.chunk.js downloaded
```

---

# Interview Answer

> Code splitting is an optimization technique in which the application bundle is divided into smaller chunks that are loaded on demand instead of downloading the entire application upfront. This reduces the initial bundle size and improves page load performance.

---

# One-Line Intuition

> **Code Splitting means "download later what you don't need right now."**
````
