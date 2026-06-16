//this looks like sequence but is parallel

/**
 * Although the forEach loop invokes the tasks one after another synchronously, it does not wait for one promise to settle before starting the next one. Therefore, all tasks begin execution almost simultaneously, making this a parallel execution pattern. The overall execution time is determined by the longest-running task rather than the sum of all task durations.
 * 
 * main point is 
 *  task(index + 1) is executed immediately for every element. The function is called right away, and it returns a Promise right away.  Promise internally starts a setTimeout, so all three timers begin counting almost at the same time.

The .then(), .catch(), and .finally() handlers are not executed immediately. They are simply attached to the Promise and registered as callbacks. These callbacks will only run after the Promise settles (either resolves or rejects).
 */
const asyncTask = function (value) {
  //let value = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        resolve(`Resolve -  ${value}`);
      } else {
        reject(`Error -  ${value}`);
      }
    }, value * 1000);
  });
};

const taskList = [asyncTask, asyncTask, asyncTask];

function executeParallel(taskList, callback) {
  let results = new Array();
  let error = new Array();
  let taskCompleted = 0;

  taskList.forEach((task, index) => {
    task(index + 1)
      .then(result => {
        console.log(result, "res*");
        results.push(result);
      })
      .catch(err => {
        console.log(err, "err*");
        error.push(err);
      })
      .finally(() => {
        taskCompleted++;
        if (taskCompleted >= taskList.length) {
          callback(results, error);
        }
      });
  });
}
let start = performance.now();
executeParallel(taskList, (results, err) => {
  console.log("Results :", results);
  console.log("Error :", err);
  let end = performance.now();
  console.log(Math.floor(end - start), "time");
});



/**
 * 
 * we can make it sequential in two ways
 * 
 * first is we can use await 
 * 
 */

async function executeSequence(taskList, callback) {
  let results = [];
  let errors = [];
  let taskCompleted = 0;

  for (let index = 0; index < taskList.length; index++) {
    console.log(index + 1, "index");
    try {
      let result = await taskList[index](index + 1);
      results.push(result);
    } catch (e) {
      errors.push(e);
    }
  }
  callback(results, errors);
}


/** second is 
 * 
 * The only reason the original code ran in parallel was because forEach invoked all the tasks immediately. By starting the next task inside the .finally() of the current task, we ensure that the next Promise is created only after the previous one settles, thereby making the execution sequential. 
 */

async function executeSequence(taskList, callback) {
  let results = [];
  let errors = [];
  let taskCompleted = 0;

  function helper(index) {
    if (index >= taskList.length) {
      callback(results, errors);
      return;
    }
    console.log("index", index + 1);
    taskList[index](index + 1)
      .then(res => {
        results.push(res);
      })
      .catch(err => {
        errors.push(err);
      })
      .finally(() => {
        taskCompleted++;
        helper(index + 1);
      });
  }

  helper(0);
}

