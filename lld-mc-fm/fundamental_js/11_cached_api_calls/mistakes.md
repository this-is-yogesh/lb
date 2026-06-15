1. all setTimeouts start at the same time

Suppose five timers are registered during the same synchronous execution. The runtime receives all five almost instantly. Their countdowns begin immediately and independently of one another. Each timer simply waits for its own duration to expire. They do not know about each other and do not wait for one another. In other words, timers are parallel countdowns, not chained delays.

Because of this behavior:

Three timers with 1000 ms delays will all become ready at roughly the same moment.
A timer with a 4000 ms delay will become ready four seconds after registration.
A timer with a 6000 ms delay will become ready six seconds after registration.

All timers start together, but they finish at different times.

Interview Explanation

If asked in an interview, I would explain it as follows:

setTimeout does not block JavaScript execution and timers are not sequential. When multiple setTimeout calls are created, their countdowns start immediately and independently. After the specified delay expires, their callbacks are placed in the task queue. The event loop then moves these callbacks to the call stack whenever the stack becomes empty. Therefore, the delay represents the earliest time at which a callback can execute, not a guarantee of exact execution time. A common mistake is to assume that multiple timers run one after another, whereas in reality they all begin counting simultaneously and simply become eligible to execute at different times.

Key Takeaway

The biggest lesson is:

setTimeout(1000) means "run this callback at least one second from now," not "run this callback one second after the previous timer completes."

Understanding this distinction is fundamental to understanding the JavaScript event loop and avoiding subtle bugs involving timers, caching, retries, throttling, and asynchronous operations.