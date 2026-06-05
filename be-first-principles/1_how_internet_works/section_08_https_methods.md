Here is the ultra-short, crisp revision summary for HTTP Methods and Idempotency.

---

### **The Crux**

HTTP methods define the **intent** of your API call. In system design, selecting the right method determines how CDNs cache data and how the system handles accidental **duplicate requests/retries** caused by shaky networks.

---

### **The HTTP Method Matrix**

| Method | Action | Idempotent? | Body? | Design Use Case |
| --- | --- | --- | --- | --- |
| **GET** | Retrieve | **Yes** | No | Fetching profiles, videos (highly cacheable by CDNs). |
| **POST** | Create | **No** | Yes | Submitting a new order, creating an account. |
| **PUT** | Replace | **Yes** | Yes | Updating an entire user profile document. |
| **PATCH** | Partial Update | **No** | Yes | Updating *just* a user's phone number. |
| **DELETE** | Remove | **Yes** | No | Deleting a video or deleting a comment. |

---

### **Idempotency: The Core Concept**

> **Idempotent** = Performing an operation multiple times yields the exact same system state as doing it once.

* **Idempotent ($\checkmark$):** `DELETE /video/1`. If you run it 5 times, the video is still gone. The state doesn't change after the first run.
* **NOT Idempotent ($\mathbf{X}$):** `POST /checkout`. If the user hits "Submit" 3 times on a slow network, they will be charged 3 times and create 3 duplicate orders.

---

### **System Design Interview Gold**

* **The Payment Trap:** Because network retries happen constantly in distributed systems, non-idempotent actions (like `POST`) need explicit safety guards. Always mention using an **Idempotency Key** (like Stripe does) to block duplicate processing.
* **The REST Mistake:** Never design URLs with actions inside them (e.g., `POST /deleteUser`). Let the method do the heavy lifting: `DELETE /user`.