**SECTION 8 - HTTP Methods**

What are HTTP Methods?
Each HTTP method tells the server what action the client wants to perform. Using the correct method is important because it affects caching, idempotency, and how proxies, CDNs, and load balancers handle the request.

Common HTTP Methods

| Method | Purpose                        | Idempotent? | Has Body? | Example |
|--------|--------------------------------|-------------|-----------|---------|
| GET    | Retrieve a resource            | Yes         | No        | GET /users/123 |
| POST   | Create a new resource          | No          | Yes       | POST /users |
| PUT    | Replace a resource entirely    | Yes         | Yes       | PUT /users/123 |
| PATCH  | Partially update a resource    | No          | Yes       | PATCH /users/123 |
| DELETE | Remove a resource              | Yes         | No        | DELETE /users/123 |

Idempotency Explained
Idempotent means calling the same operation multiple times gives the same result.

- GET, PUT, DELETE → Idempotent (safe to retry)
- POST, PATCH → Not idempotent (retrying can create duplicates)

Why Idempotency Matters in System Design
In real systems, network failures and retries are very common. 

If a user clicks "Submit Order" twice due to slow network:
- Using POST can create duplicate orders
- This causes problems like double charging

This is why payment systems (like Stripe) use idempotency keys with POST requests to prevent duplicates.

Common Interview Mistake
Using POST for everything (like POST /getUser or POST /deleteUser). 

Best practice: Use the correct HTTP method to show the action and the URL to identify the resource.
