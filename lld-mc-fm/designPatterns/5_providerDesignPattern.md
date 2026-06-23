# Provider Design Pattern in React

## What is Provider Pattern?

The **Provider Pattern** is a design pattern used to **share data with multiple components without passing props manually through every level of the component tree**.

It is commonly implemented using React's **Context API**.

---

## Definition

> **Provider Pattern allows components to access shared data from a central provider instead of passing props through intermediate components.**

---

# Why Do We Need Provider Pattern?

Suppose we have:

```text
App
 ↓
Parent
 ↓
Child
 ↓
GrandChild
```

And only the `GrandChild` needs some data.

Without Provider Pattern:

```jsx
<App user={user}>
  <Parent user={user}>
    <Child user={user}>
      <GrandChild user={user}/>
    </Child>
  </Parent>
</App>
```

Every component must accept and forward props.

This is called **Props Drilling**.

---

# Problem with Props Drilling

Suppose:

```text
App
 ↓
Header
 ↓
Sidebar
 ↓
Main
 ↓
Article
```

Only `Article` needs `user`.

Still:

```jsx
App
↓
Header(user)
↓
Sidebar(user)
↓
Main(user)
↓
Article(user)
```

Many components receive props they don't even use.

Problems:

* Boilerplate code
* Difficult maintenance
* Increased coupling
* Easy to introduce bugs
* Unnecessary re-renders

---

# Real-World Analogy

Think of electricity in a house.

Without Provider Pattern:

```text
Power Source
     ↓
Room1
     ↓
Room2
     ↓
Room3
     ↓
Television
```

Every room forwards electricity.

---

With Provider Pattern:

```text
           Main Power Line
                 |
     --------------------------
     |            |           |
 Bedroom      Kitchen      TV
```

Any room can directly access power.

Similarly:

```text
Provider
    |
-------------------------
|         |             |
Header   Main       Sidebar
                     |
                  Article
```

Any component inside the Provider can directly access the shared data.

---

# Basic Flow

```text
Provider
    ↓
Stores shared state
    ↓
Children consume state
```

---

# Before Provider Pattern (Props Drilling)

```jsx
const Parent = () => {

  const topic = {
    title: "Tech",
    articles: [
      {
        title: "Web3",
        content: ""
      }
    ]
  };

  return <Child topic={topic} />;
};
```

---

Child:

```jsx
const Child = ({ topic }) => {

  return (
    <>
      <Header title={topic.title}/>
      <Main articles={topic.articles}/>
    </>
  );

};
```

---

Header:

```jsx
const Header = ({ title }) => {

  return (
    <h1>{title}</h1>
  );

};
```

---

Main:

```jsx
const Main = ({ articles }) => {

  return (
    <>
      {articles.map(article => (
        <div key={article.id}>
          {article.title}
        </div>
      ))}
    </>
  );

};
```

---

Flow:

```text
Parent
 ↓
Child
 ↓
Header
 ↓
Main
```

Props are manually passed everywhere.

---

# Using Provider Pattern

React provides:

```js
React.createContext()
```

to create a shared context.

---

## Step 1: Create Context

```jsx
const FeatureContext =
  React.createContext();
```

---

## Step 2: Create Provider

```jsx
function App() {

  const features = {
    darkMode: true,
    googlePayEnabled: true
  };

  return (

    <FeatureContext.Provider
      value={features}
    >

      <Main />
      <Sidebar />

    </FeatureContext.Provider>

  );

}
```

---

Visual representation:

```text
Feature Provider
      |
---------------------
|                   |
Main             Sidebar
```

---

## Step 3: Consume Context

```jsx
const Main = () => {

  const features =
    React.useContext(
      FeatureContext
    );

  return (
    features.googlePayEnabled
      ? <GooglePay/>
      : <ApplePay/>
  );

};
```

---

Flow:

```text
Provider
    ↓
Shared Data
    ↓
useContext()
    ↓
Consumer Component
```

---

# How Provider Pattern Works

Suppose:

```jsx
<ThemeProvider>
  <Navbar />
  <Home />
  <Footer />
</ThemeProvider>
```

Internally:

```text
ThemeProvider
      |
------------------------
|          |            |
Navbar    Home       Footer
```

When any component calls:

```jsx
useContext(ThemeContext)
```

React finds the nearest provider and returns its value.

---

# Example 1: Theme Provider

### Create Context

```jsx
const ThemeContext =
  React.createContext();
```

---

### Create Provider

```jsx
function ThemeProvider({ children }) {

  const [theme, setTheme] =
    useState("light");

  return (

    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}
```

---

### Use Context

```jsx
function Header() {

  const { theme } =
    useContext(ThemeContext);

  return <h1>{theme}</h1>;

}
```

---

Component tree:

```text
ThemeProvider
     |
--------------------
|                  |
Header          Footer
```

Both components share the same state.

---

# Example 2: Authentication Provider

This is one of the most common examples.

---

### AuthContext

```jsx
const AuthContext =
  createContext();
```

---

### AuthProvider

```jsx
function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}
```

---

### Usage

```jsx
function Profile() {

  const { user } =
    useContext(AuthContext);

  return (
    <h1>
      {user?.name}
    </h1>
  );

}
```

---

Structure:

```text
AuthProvider
      |
-------------------
|                 |
Navbar         Profile
```

---

# Example 3: Feature Flags

Feature flags allow enabling or disabling features remotely.

---

Provider:

```jsx
const FeatureFlagContext =
  createContext();
```

---

```jsx
function FeatureFlagProvider(
  { children }
) {

  const [features] = useState({

    darkMode: true,

    chatEnabled: false

  });

  return (

    <FeatureFlagContext.Provider
      value={features}
    >

      {children}

    </FeatureFlagContext.Provider>

  );

}
```

---

Consumer:

```jsx
function ChatWrapper() {

  const features =
    useContext(
      FeatureFlagContext
    );

  return (
    features.chatEnabled
      ? <Chat />
      : null
  );

}
```

---

Flow:

```text
Feature Provider
       |
-------------------------
|                       |
ChatWrapper         PaymentWrapper
```

---

# Example 4: Language Provider

```jsx
const LanguageContext =
  createContext();
```

---

```jsx
function LanguageProvider(
  { children }
) {

  const [language] =
    useState("English");

  return (

    <LanguageContext.Provider
      value={language}
    >

      {children}

    </LanguageContext.Provider>

  );

}
```

---

Consumer:

```jsx
function Navbar() {

  const language =
    useContext(
      LanguageContext
    );

  return (
    <h1>
      {language}
    </h1>
  );

}
```

---

# Example 5: Shopping Cart

Provider:

```jsx
<CartProvider>
    <Navbar />
    <Products />
    <Checkout />
</CartProvider>
```

Structure:

```text
CartProvider
      |
--------------------
|         |         |
Navbar Products Checkout
```

All components can access:

```jsx
const { cartItems } =
  useContext(CartContext);
```

without props drilling.

---

# Example 6: Redux Works Similarly

Redux follows the Provider Pattern.

```jsx
<Provider store={store}>
    <App />
</Provider>
```

Components access state through:

```jsx
useSelector()
```

Flow:

```text
Redux Provider
       |
Entire Application
```

---

# Provider Pattern + Custom Hook

Instead of writing:

```jsx
const value =
  useContext(AuthContext);
```

everywhere:

Create:

```jsx
function useAuth() {

  return useContext(
    AuthContext
  );

}
```

Usage:

```jsx
const { user } = useAuth();
```

Cleaner and reusable.

---

# Performance Considerations

Whenever the Provider's value changes:

```jsx
<AuthProvider>
```

all consumers re-render.

---

Example:

```jsx
value={{
  user,
  setUser
}}
```

Changing `user` causes every component using that context to re-render.

---

Visual:

```text
Provider
      |
---------------------
|         |         |
A         B         C
```

Provider updates:

```text
A re-renders
B re-renders
C re-renders
```

---

# Solution: Split Contexts

Instead of:

```jsx
AppContext
```

containing:

```jsx
{
  theme,
  user,
  cart,
  language
}
```

Split into:

```text
ThemeProvider
UserProvider
CartProvider
LanguageProvider
```

so only relevant components re-render.

---

# Context Composition

```jsx
<AuthProvider>

  <ThemeProvider>

    <CartProvider>

      <App />

    </CartProvider>

  </ThemeProvider>

</AuthProvider>
```

Structure:

```text
AuthProvider
     ↓
ThemeProvider
     ↓
CartProvider
     ↓
App
```

---

# Provider Pattern vs Props Drilling

| Feature                         | Props Drilling | Provider Pattern |
| ------------------------------- | -------------- | ---------------- |
| Passing through every component | ✅              | ❌                |
| Shared state                    | Difficult      | Easy             |
| Boilerplate                     | High           | Low              |
| Scalability                     | Poor           | Good             |
| Maintainability                 | Difficult      | Better           |
| Coupling                        | High           | Low              |

---

# Provider Pattern vs Redux

| Feature               | Context Provider  | Redux      |
| --------------------- | ----------------- | ---------- |
| Built into React      | ✅                 | ❌          |
| External Library      | ❌                 | ✅          |
| Best for              | Small-medium apps | Large apps |
| Performance Optimized | Moderate          | Better     |
| Middleware            | ❌                 | ✅          |
| DevTools              | ❌                 | ✅          |

---

# Advantages

### Avoids Props Drilling

Components don't need intermediate props.

---

### Centralized State

Shared data lives in one place.

---

### Cleaner Components

Consumers only read what they need.

---

### Loose Coupling

Parent components don't need knowledge of grandchildren.

---

### Reusable

Custom hooks can simplify access.

---

# Disadvantages

### Re-renders Consumers

Context updates trigger re-renders.

---

### Not Ideal for Huge State

Large applications may benefit from:

* Redux
* Zustand
* Jotai
* MobX

---

### Overusing Context Can Hurt Performance

Putting everything inside one provider can lead to unnecessary re-renders.

---

# Where Is Provider Pattern Used?

### Theme Management

```text
ThemeProvider
```

---

### Authentication

```text
AuthProvider
```

---

### Shopping Cart

```text
CartProvider
```

---

### Language / Localization

```text
LanguageProvider
```

---

### Feature Flags

```text
FeatureFlagProvider
```

---

### Redux Store

```text
Provider store={store}
```

---

### React Query

```text
QueryClientProvider
```

---

### Apollo GraphQL

```text
ApolloProvider
```

---

### React Router

```text
BrowserRouter
```

is internally a Provider.

---

# Summary

```text
Provider
     |
--------------------------------
|             |                |
Consumer1   Consumer2      Consumer3
      ↑          ↑             ↑
       --------useContext------
```

## Key Idea

> **Provider Pattern allows multiple components to access shared data from a central source without manually passing props through intermediate components.**

It is one of the most fundamental patterns in React and is used internally by:

* Context API
* Redux
* React Query
* React Router
* Apollo Client
* Theme systems
* Authentication systems
* Feature flags
* Global state management frameworks
