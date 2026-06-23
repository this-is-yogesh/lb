# Container and Presentational Pattern in React

## What is the Container / Presentational Pattern?

The **Container / Presentational Pattern** is a React design pattern that separates:

* **Application Logic (Container Components)** from
* **UI Rendering (Presentational Components)**

The idea is:

> **Separate "what data to show" from "how to show it".**

---

# Definition

A **Container Component** handles:

* Fetching data
* State management
* Business logic
* API calls

A **Presentational Component** handles:

* Layout
* Styling
* Rendering UI

---

# Why Do We Need This Pattern?

Without separation:

```jsx
function Beer() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {

    fetch(...);

  }, []);

  return (
    // huge UI
  );
}
```

One component becomes responsible for:

* Fetching data
* Error handling
* State
* Rendering
* Styling

This violates the **Single Responsibility Principle**.

---

# Real-world Analogy

Think of a restaurant.

### Chef

Responsible for:

* Preparing food

### Waiter

Responsible for:

* Serving food

```text
Chef
 ↓
Prepares food

Waiter
 ↓
Displays food
```

Similarly:

```text
Container
 ↓
Prepares data

Presentational Component
 ↓
Displays data
```

---

# Structure

```text
Container Component
        ↓
Application Logic
(API, state, fetching)
        ↓
Pass props
        ↓
Presentational Component
        ↓
Render UI
```

---

# Responsibilities

## Container Component

Responsible for:

* API calls
* State
* Error handling
* Business logic

Not responsible for:

❌ Styling

❌ Layout

---

## Presentational Component

Responsible for:

* Markup
* CSS
* Rendering

Not responsible for:

❌ API calls

❌ State management

---

# Example: Beer List

Suppose we want:

```text
Beer Page
 ↓
Fetch beers
 ↓
Display beers
```

---

# Container Component

### Beer.js

```jsx
import { useState, useEffect }
from "react";

import BeerList
from "./BeerList";

function Beer() {

  const [beers, setBeers] =
    useState([]);

  useEffect(() => {

    fetchBeers();

  }, []);

  async function fetchBeers() {

    try {

      let response =
        await fetch(
          "api-url"
        );

      response =
        await response.json();

      setBeers(response);

    }
    catch(error){

      console.log(error);

    }

  }

  return (
    <BeerList
      beers={beers}
    />
  );

}

export default Beer;
```

---

Container responsibilities:

```text
Fetch API
 ↓
Store state
 ↓
Pass data as props
```

No UI logic.

---

# Presentational Component

### BeerList.js

```jsx
function BeerList({ beers }) {

  return beers.map(

    beer => (

      <div
        key={beer.id}
      >

        <img
          src={beer.image_url}
        />

        <h2>
          {beer.name}
        </h2>

        <p>
          {beer.description}
        </p>

      </div>

    )

  );

}
```

---

Presentational component:

```text
Receives data
 ↓
Render UI
```

Nothing else.

---

# Flow of Execution

```text
Beer Component
      ↓
Fetch API
      ↓
Store beers in state
      ↓
Pass beers prop
      ↓
BeerList Component
      ↓
Render UI
```

---

# Visual Representation

```text
            Beer
        (Container)
               |
       ----------------
       |              |
fetch API         state
               |
               ↓
          beers prop
               ↓
          BeerList
      (Presentational)
               ↓
             UI
```

---

# Complete Structure

```text
Beer.js
(Container)

        ↓

BeerList.js
(Presentational)

        ↓

CSS
```

---

# Why is Presentational Component Reusable?

Because it only depends on props.

```jsx
<BeerList beers={beers}/>
```

or

```jsx
<BeerList beers={favorites}/>
```

or

```jsx
<BeerList beers={searchResults}/>
```

Same component works everywhere.

---

# Example 1: Product Page

Container:

```jsx
ProductContainer
```

Responsibilities:

* Fetch products
* Pagination
* Search

---

Presentational:

```jsx
ProductList
```

Responsibilities:

* Display cards

---

Flow:

```text
ProductContainer
      ↓
products
      ↓
ProductList
```

---

# Example 2: User Profile

Container:

```jsx
UserProfileContainer
```

Responsible for:

* Fetching user
* Updating user

---

Presentational:

```jsx
UserProfileView
```

Responsible for:

* Showing avatar
* Showing name

---

```text
UserProfileContainer
       ↓
user
       ↓
UserProfileView
```

---

# Example 3: Shopping Cart

Container:

```jsx
CartContainer
```

Handles:

* Cart state
* Add item
* Remove item

---

Presentational:

```jsx
CartView
```

Handles:

* UI

---

Flow:

```text
CartContainer
     ↓
items
     ↓
CartView
```

---

# Example 4: Dashboard

Container:

```jsx
DashboardContainer
```

Responsible for:

* Fetch metrics
* Filters
* Date range

---

Presentational:

```jsx
DashboardView
```

Responsible for:

* Charts
* Cards
* Tables

---

# Comparison with HOC

HOC:

```text
Component
    ↓
withFetchData()
    ↓
Enhanced Component
```

---

Container Pattern:

```text
Container
     ↓
props
     ↓
Presentational Component
```

Both separate logic and UI.

---

# Problem with Container Components

Suppose:

```text
AuthContainer
     ↓
ThemeContainer
     ↓
CartContainer
     ↓
DashboardContainer
     ↓
DashboardView
```

Too much nesting appears.

This is similar to HOC wrapper hell.

---

# Hooks Replaced Containers

Modern React usually replaces:

```text
Container Component
```

with

```text
Custom Hook
```

---

Instead of:

```text
Beer Container
     ↓
BeerList
```

we use:

```text
useBeer()
     ↓
BeerList
```

---

# Creating a Custom Hook

```jsx
function useBeer() {

  const [beer, setBeer] =
    useState([]);

  useEffect(() => {

    fetch("api")
      .then(res => res.json())
      .then(data => {

        setBeer(data);

      });

  }, []);

  return beer;

}
```

---

# Presentational Component Using Hook

```jsx
function BeerList() {

  const beers = useBeer();

  return beers.map(

    beer => (

      <div key={beer.id}>
        {beer.name}
      </div>

    )

  );

}
```

---

Flow becomes:

```text
BeerList
    ↓
useBeer()
    ↓
Fetch data
    ↓
Return beers
    ↓
Render UI
```

No wrapper component required.

---

# Hook + Presentational Pattern

Modern React prefers:

```text
Custom Hook
        ↓
Presentational Component
```

instead of:

```text
Container Component
        ↓
Presentational Component
```

---

# Comparison

## Container Pattern

```text
Container
     ↓
Presentational
```

---

## Hook Pattern

```text
Hook
 ↓
Presentational
```

---

# Example

### Old Approach

```jsx
<UserContainer>

  <UserView />

</UserContainer>
```

---

### Modern Approach

```jsx
function UserView(){

  const user = useUser();

}
```

Much flatter.

---

# Advantages

## Separation of Concerns

Logic and UI stay independent.

---

## Reusability

Presentational components are reusable.

---

## Easier Testing

UI components are pure.

---

## Readability

Smaller focused components.

---

## Single Source of Truth

Business logic remains centralized.

---

# Disadvantages

## More Files

Container + View.

---

## Deep Component Nesting

Multiple containers create wrapper hell.

---

## Hooks Are Simpler

Modern React usually prefers hooks.

---

# Container Pattern vs HOC

| Feature           | Container Pattern | HOC          |
| ----------------- | ----------------- | ------------ |
| Reuse logic       | Yes               | Yes          |
| Extra wrapper     | Yes               | Yes          |
| Composition       | Moderate          | High         |
| Readability       | Better            | More nesting |
| Modern preference | Less              | Less         |

---

# Container Pattern vs Hooks

| Feature           | Container Pattern | Hooks     |
| ----------------- | ----------------- | --------- |
| Wrapper component | Yes               | No        |
| Nesting           | High              | Low       |
| Reuse logic       | Yes               | Yes       |
| Modern React      | Less preferred    | Preferred |
| Readability       | Good              | Better    |

---

# Real Examples

### React Query

```jsx
const users = useQuery(...)
```

Hook + UI pattern.

---

### Redux

Old:

```jsx
UserContainer
```

Modern:

```jsx
useSelector()
```

---

### Apollo

```jsx
useQuery()
```

---

### Zustand

```jsx
useStore()
```

---

### SWR

```jsx
useSWR()
```

---

# Summary

## Traditional Container Pattern

```text
Container Component
(API + State)
       ↓
Props
       ↓
Presentational Component
(Layout + Rendering)
```

---

## Modern Hook Pattern

```text
Custom Hook
(API + State)
       ↓
Presentational Component
(Layout + Rendering)
```

---

# Key Idea

> **Container Components answer "What data should be shown?", while Presentational Components answer "How should the data be shown?"**

This pattern promotes:

* Separation of concerns
* Reusability
* Maintainability
* Easier testing

Modern React applications usually replace the container component with **custom hooks**, resulting in the **Hook + Presentational Pattern**, which is currently the preferred approach.
