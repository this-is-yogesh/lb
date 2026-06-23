# Higher-Order Component (HOC) Pattern in React

## What is a Higher-Order Component (HOC)?

A **Higher-Order Component (HOC)** is a pattern in React where a function takes a component as input and returns a new component with additional functionality.

In simple words:

> **A HOC is a function that receives a component and returns an enhanced component.**

---

# Definition

```text
Component
     ↓
Higher Order Component
     ↓
Enhanced Component
```

Mathematically:

```js
HOC(Component) → EnhancedComponent
```

---

# Why Do We Need HOCs?

Suppose we have multiple components that need:

* API fetching
* Loading state
* Error handling
* Authentication
* Logging
* Styling

Without HOC:

```text
Products Component
  ↓
Loading Logic
Error Logic
Fetch Logic

Photos Component
  ↓
Loading Logic
Error Logic
Fetch Logic

Albums Component
  ↓
Loading Logic
Error Logic
Fetch Logic
```

The same code gets repeated everywhere.

---

Using HOC:

```text
withFetchData()
        ↓
--------------------------------
↓              ↓              ↓
Products      Photos         Albums
```

The fetch logic is written once and reused everywhere.

---

# Real-World Analogy

Think of gift wrapping.

Without wrapper:

```text
Toy
```

With wrapper:

```text
Gift Wrapper
      ↓
Wrapped Toy
```

The toy remains unchanged, but gains additional behavior.

Similarly:

```text
Component
     ↓
HOC
     ↓
Enhanced Component
```

---

# Basic Syntax

```js
const withSomething = (Component) => {

  return function EnhancedComponent(props) {

    // additional logic

    return (
      <Component {...props} />
    );

  };

};
```

---

# Flow of HOC

```text
Original Component
       ↓
Pass into HOC
       ↓
HOC adds logic
       ↓
Returns new component
       ↓
Use enhanced component
```

---

# Example: Redux connect()

One of the most famous HOCs.

```js
const ConnectedUsers =
connect(
  usersSelector,
  usersActions
)(UsersList);
```

Equivalent to:

```js
const connectRedux =
  connect(
    usersSelector,
    usersActions
  );

const ConnectedUsers =
  connectRedux(
    UsersList
  );
```

---

Visual:

```text
UsersList
     ↓
connect()
     ↓
Users + Actions
     ↓
ConnectedUsersList
```

---

# Simple Product Component

```jsx
const ProductsList = ({ data }) => {

  return data.map(product => (

    <div key={product.id}>

      <h2>
        {product.title}
      </h2>

    </div>

  ));

};
```

This component only displays data.

It knows nothing about:

* API calls
* Loading
* Errors

which is good.

---

# Creating an HOC

Convention:

HOCs usually start with:

```js
withSomething()
```

Examples:

```js
withFetchData()
withAuth()
withStyles()
withTheme()
withLogger()
```

---

Basic structure:

```js
const withFetchData =
(
  Component,
  url
) => {

  return function(props){

    // logic

    return (
      <Component
        {...props}
      />
    );

  };

};
```

---

# Implementing withFetchData()

```jsx
const withFetchData =
(
  Component,
  url
) => {

  return function(props){

    const [loading,setLoading] =
      useState(false);

    const [error,setError] =
      useState(false);

    const [data,setData] =
      useState([]);

    useEffect(() => {

      async function fetchData(){

        setLoading(true);

        try{

          let response =
            await fetch(url);

          if(response.ok){

            response =
              await response.json();

            setData(response);

          }
          else{

            setError(true);

          }

        }
        catch{

          setError(true);

        }
        finally{

          setLoading(false);

        }

      }

      fetchData();

    }, []);

    if(loading){

      return <div>Loading...</div>;

    }

    if(error){

      return (
        <div>
          Something went wrong
        </div>
      );

    }

    return (

      <Component
        data={data}
        {...props}
      />

    );

  };

};
```

---

# Using the HOC

```js
const Todos =
withFetchData(
  ProductsList,
  "/todos"
);
```

Then:

```jsx
<Todos />
```

---

Flow:

```text
ProductsList
      ↓
withFetchData()
      ↓
Loading + Error + Fetch Logic
      ↓
Todos Component
```

---

# Reusing Logic

```js
const Todos =
withFetchData(
  ProductsList,
  "/todos"
);

const Photos =
withFetchData(
  ProductsList,
  "/photos"
);

const Albums =
withFetchData(
  ProductsList,
  "/albums"
);
```

---

Visual:

```text
               withFetchData()
                     |
--------------------------------------
|                 |                  |
Todos          Photos             Albums
```

---

# Example 1: Authentication HOC

Suppose protected pages require login.

Without HOC:

```text
Dashboard
Check Auth

Profile
Check Auth

Settings
Check Auth
```

Repeated logic.

---

HOC:

```jsx
const withAuth =
(Component)=>{

  return function(props){

    const isLoggedIn = true;

    if(!isLoggedIn){

      return <Login />;

    }

    return (
      <Component
        {...props}
      />
    );

  };

};
```

---

Usage:

```js
const ProtectedDashboard =
withAuth(
  Dashboard
);
```

---

Flow:

```text
Dashboard
     ↓
withAuth()
     ↓
ProtectedDashboard
```

---

# Example 2: Logger HOC

```jsx
const withLogger =
(Component)=>{

  return function(props){

    console.log(
      "Rendered"
    );

    return (
      <Component
        {...props}
      />
    );

  };

};
```

Usage:

```js
const LoggedProfile =
withLogger(Profile);
```

---

# Example 3: Loading Spinner

```jsx
const withLoader =
(Component)=>{

  return function({
    loading,
    ...props
  }){

    if(loading){

      return (
        <Spinner />
      );

    }

    return (
      <Component
        {...props}
      />
    );

  };

};
```

Usage:

```js
const ProductPage =
withLoader(
  ProductsPage
);
```

---

# Example 4: Styling HOC

```jsx
const withStyles =
(Component)=>{

  return function(props){

    const style = {

      color:"red"

    };

    return (

      <Component
        style={style}
        {...props}
      />

    );

  };

};
```

Usage:

```js
const StyledButton =
withStyles(
  Button
);
```

---

# HOC Composition

Multiple HOCs can be combined.

```js
withFetchData(
  withStyles(
    ProductsList
  )
);
```

---

Flow:

```text
ProductsList
      ↓
withStyles()
      ↓
StyledProducts
      ↓
withFetchData()
      ↓
Final Component
```

---

Visual:

```text
ProductsList
      ↓
withStyles
      ↓
withFetchData
      ↓
Enhanced Component
```

---

# Example

```js
const Todos =

withFetchData(

  withStyles(
    ProductsList
  ),

"/todos");
```

---

# HOCs Are Pure Functions

Given the same input:

```js
withStyles(Button)
```

it should always return the same output.

HOCs should:

✅ Add functionality

❌ Modify original component

---

# Props Forwarding

Very important:

Always pass:

```jsx
<Component
  {...props}
/>
```

Otherwise parent props are lost.

---

Wrong:

```jsx
<Component />
```

Correct:

```jsx
<Component
  {...props}
/>
```

---

# HOC Naming Convention

Use:

```js
withFetchData()
withAuth()
withTheme()
withLogger()
withStyles()
```

Prefix:

```text
with
```

makes it obvious that it's an HOC.

---

# HOC vs Normal Component

Normal component:

```jsx
Button
```

HOC:

```jsx
withStyles(Button)
```

returns:

```jsx
StyledButton
```

---

# Real Examples

## Redux connect()

```js
connect()
```

---

## React Router

Older versions:

```js
withRouter()
```

---

## Apollo GraphQL

```js
graphql()
```

---

## Material UI

```js
withTheme()
```

---

## Firebase

```js
withFirebase()
```

---

# Problems with HOCs

## Wrapper Hell

Multiple HOCs create nesting.

```text
withAuth
   ↓
withLogger
   ↓
withTheme
   ↓
withStyles
   ↓
Profile
```

Hard to debug.

---

## Props Collision

Two HOCs may inject:

```js
user
```

leading to conflicts.

---

## Unnecessary Re-renders

Props travel through several wrappers.

---

## Component Tree Becomes Deep

React DevTools become cluttered.

---

# Hooks Solved Many HOC Problems

Instead of:

```js
withFetchData(
  ProductsList
);
```

Modern React prefers:

```js
function Products(){

  const {
    data,
    loading
  } = useFetchData();

}
```

---

Flow:

```text
Component
      ↓
Custom Hook
      ↓
Logic
```

No extra wrapper components.

---

# HOC vs Custom Hook

| Feature                 | HOC      | Custom Hook |
| ----------------------- | -------- | ----------- |
| Reuse Logic             | ✅        | ✅           |
| Adds Wrapper Components | ✅        | ❌           |
| Component Nesting       | High     | Low         |
| Props Collision         | Possible | No          |
| Modern React Preference | Less     | More        |
| Introduced Earlier      | ✅        | ❌           |

---

# HOC vs Render Props

| Feature           | HOC    | Render Props |
| ----------------- | ------ | ------------ |
| Wrapper Component | Yes    | Yes          |
| Reuse Logic       | Yes    | Yes          |
| Callback Function | No     | Yes          |
| Nesting Problem   | Medium | High         |
| Modern Usage      | Less   | Less         |

---

# Advantages

### Reusability

Write logic once and reuse everywhere.

---

### Separation of Concerns

UI components remain focused on rendering.

---

### Single Source of Truth

Business logic stays centralized.

---

### Composition

Multiple HOCs can be combined.

---

### Uniformity

Similar behavior across components.

---

# Disadvantages

### Wrapper Hell

Too many HOCs create deep trees.

---

### Performance Overhead

Extra components and prop forwarding.

---

### Props Collisions

Injected props may overwrite existing props.

---

### Harder Debugging

DevTools show many wrapper components.

---

# Summary

```text
Original Component
        ↓
Higher Order Component
        ↓
Additional Logic
(Fetch/Auth/Styles/Logger)
        ↓
Enhanced Component
```

Example:

```text
ProductsList
      ↓
withStyles()
      ↓
StyledProducts
      ↓
withFetchData()
      ↓
Todos
```

---

## Key Idea

> **A Higher-Order Component is a function that takes a component and returns a new component with additional behavior or props.**

It is used to:

* Reuse logic
* Promote separation of concerns
* Maintain uniformity
* Avoid duplication

and is the pattern behind:

* Redux `connect()`
* `withRouter()`
* `withTheme()`
* Apollo GraphQL HOCs
* Authentication wrappers
* Logging wrappers
* Styling wrappers

In modern React, **custom hooks have largely replaced HOCs**, but understanding HOCs remains important because many libraries and older codebases still rely on them.
