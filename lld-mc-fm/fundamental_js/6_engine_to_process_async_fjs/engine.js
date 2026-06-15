
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


class QueueCallbacks {
  constructor(order = "FIFO") {
    this.order = order;
    this.engine = 0;
    this.queue = new Array();
  }

  process = function (cb) {
    if (!this.engine || this.engine < 2) {
      this.engine++;
      cb()
        .then(res => {})
        .finally(() => {
          this.engine--;
          console.log(this.queue.length, "queLen-1");
          this.processEngine();
        });
    } else if (this.queue.length < 6) {
      this.queue.push(cb);
    }
  };

  processEngine = function () {
    if (this.queue.length && this.engine < 2) {
      let cb = this.order === "FIFO" ? this.queue.shift() : this.queue.pop();
      this.process(cb);
    }
  };
}

function asyncFn(i) {
  return function () {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(i);
      }, i * 100);
    });
  };
}

let obj = new QueueCallbacks();
obj.process(asyncFn(1));
obj.process(asyncFn(2));
obj.process(asyncFn(3));
obj.process(asyncFn(4));
obj.process(asyncFn(5));
obj.process(asyncFn(6));
obj.process(asyncFn(7));
obj.process(asyncFn(8));
obj.process(asyncFn(9));
obj.process(asyncFn(10));

