1. why we are doing await A() and await B() for seq but 
await promiseA and await promiseB for parallel

In sequential execution, each asynchronous task starts only after the previous one completes, so the total time is the sum of all durations. In concurrent execution, all tasks are initiated first and then awaited later, allowing them to overlap. Since await only waits and does not start execution, the overall time becomes the duration of the slowest task. Promise.all() is simply a utility for waiting on multiple already-started promises and does not itself create parallelism.


