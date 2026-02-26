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
      console.log(this.queueOfCallbacks.length, "queuelength");
    }
  };

  //private method
  //if we do executeNext = function(){} and call executeNext because it is a normal function, this inside will depened on how its called and hence it was not working but using arrow function inherits this from parent scope so this works in executeNext
  const executeNext = () => {
    if (this.queueOfCallbacks && this.orderExecutionLimit < 2) {
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

let obj = new QueueCallback();
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
