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

function dummyAPI(index) {
  return () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (index === 3) {
          rej(index);
        } else {
          res(index);
        }
      }, index * 1000);
    });
  };
}
function QueueCallback(order = "FIFO") {
  this.order = order;
  this.orderExecutionLimit = 0;
  this.queueArrayCb = new Array();
  this.process = function (cb) {
    if (this.orderExecutionLimit < 2) {
      this.orderExecutionLimit++;

      cb()
        .then(res => {
          console.log(res, "res*");
        })
        .finally(() => {
          this.orderExecutionLimit--;
          executeNext();
        });
    } else {
      if (this.queueArrayCb.length < 6) {
        this.queueArrayCb.push(cb);
      }
    }
  };

  const executeNext = () => {
    if (this.queueArrayCb.length > 0 && this.orderExecutionLimit < 2) {
      let cb =
        this.order === "FIFO"
          ? this.queueArrayCb.shift()
          : this.queueArrayCb.pop();
      if (cb) {
        this.process(cb);
      }
    }
  };
}

let obj = new QueueCallback("FIFO");
// obj.process(dummyAPI(1));
// obj.process(dummyAPI(2));
// obj.process(dummyAPI(3));
// obj.process(dummyAPI(4));
// obj.process(dummyAPI(5));
// obj.process(dummyAPI(6));
// obj.process(dummyAPI(7));
// obj.process(dummyAPI(8));

/** different ways to execute async tasks in series one after the other */

let promises = [
  dummyAPI(5),
  dummyAPI(3),
  dummyAPI(1),
  dummyAPI(4),
  dummyAPI(2),
];

executeAsyncTasks(promises);

function executeAsyncTasks(promises) {
  promises.reduce((acc, curr) => {
    return acc
      .then(() => {
        return curr()
          .then(res => console.log(res, "res*"))
          .catch(e => {
            console.log(e, "error*");
            return Promise.resolve(); 
          });
      })

  }, Promise.resolve());
}
