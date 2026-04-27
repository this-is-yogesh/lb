1. The main concept is closure — each useEffect creates its own flag, and when cleanup runs, it updates that specific flag so the async code inside that closure knows whether it should still update state, 
so basically Each effect has its own memory (closure), and cleanup updates that memory.

2. so abort works like it tries to stop the fetch request from happening but because the todo api is fast, we have put the manual setTimeout to simulate network delay, say we have 10 buttons and each button initiates a network request so what we are doing here is, clicking on the other button aborts the request of prev button but sometime when api calls are fast, the response is here before we could abort by clicking the next button so we are checking controller.abort.signal , if button was clicked , the signal is aborted and even though response is here, if signal was aborted, we will not take that response into consideraton

Before response arrives → Abort can stop it
After response arrives → Only you can ignore it

also The AbortController can only work with the fetch request, for other asynchronous operations you can use the flag.