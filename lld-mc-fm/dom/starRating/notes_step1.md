I used event delegation by attaching a single mouseover listener to the parent container instead of individual listeners on each star. Since mouse events bubble up the DOM, the parent receives the event, and event.target tells me which child actually triggered it. This approach reduces the number of event listeners, scales well for dynamically added elements, and simplifies maintenance.

NOTE:
Remember this sentence:
target = where the event happened
currentTarget = where the listener is attached

I stored the star index using a data-index attribute because data-* attributes are the standard HTML mechanism for attaching custom metadata to elements. This keeps application data separate from styling (class) and element identity (id), making the code cleaner and easier to understand.