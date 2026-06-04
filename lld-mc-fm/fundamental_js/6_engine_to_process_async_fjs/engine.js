
/**
 * 
 * The problem statement reads as:
The process method receives a single async function that should be executed by following the algorithm described below:

If there is currently no async function being executed by the class, the received callback method should be executed immediately.
If there is currently only one async function being executed, the callback method should be executed immediately as well.
If there are two async functions currently being executed, the next callback method should be put into the queue.
After one of the currently executing async functions is finished
When there were no arguments passed to the constructor, the first callback method that was pushed into the queue should be executed (First in, first out).
When the argument passed to the constructor was LIFO, the last callback in the queue should be executed.
If there are more than 6 callbacks in the queue, discard any extra callbacks
If there are more than 3 callbacks in the queue, follow FIFO if no argument is passed to the constructor.
 */


const QueueCallback = function (order = "FIFO") {
  this.order = order;
  this.orderExecutionLimit = 0;
  this.queueOfCallbacks = new Array();

  //public method
  this.process = function (callback) {
    if (this.orderExecutionLimit < 2) {
      this.orderExecutionLimit++;
      callback()
        .then(i => {
          console.log(i, "processed");
        })
        .finally(() => {
          this.orderExecutionLimit--;
          executeNext();
        });
    } else {
      if (this.queueOfCallbacks.length < 6)
        this.queueOfCallbacks.push(callback);
      // console.log(this.queueOfCallbacks.length, "queuelength");
    }
  };

  //private method
  //if we do executeNext = function(){} and call executeNext because it is a normal function, this inside will depened on how its called and hence it was not working but using arrow function inherits this from parent scope so this works in executeNext
  const executeNext = () => {
    if (this.queueOfCallbacks.length > 0 && this.orderExecutionLimit < 2) {
      let nextFunctionToExecute =
        this.order == "FIFO"
          ? this.queueOfCallbacks.shift()
          : this.queueOfCallbacks.pop();

      if (nextFunctionToExecute) this.process(nextFunctionToExecute);
    }
  };
};

function dummyAPI(index) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(index);
      }, 1000);
    });
  };
}

let obj = new QueueCallback("LIFO");
obj.process(dummyAPI(1));
obj.process(dummyAPI(2));
obj.process(dummyAPI(3));
obj.process(dummyAPI(4));
obj.process(dummyAPI(5));
obj.process(dummyAPI(6));
obj.process(dummyAPI(7));
obj.process(dummyAPI(8));
obj.process(dummyAPI(9));
obj.process(dummyAPI(10));
