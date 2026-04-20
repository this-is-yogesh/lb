1. 


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


let promises = [
  dummyAPI(1),
  dummyAPI(2),
  dummyAPI(3),
  dummyAPI(4),
  dummyAPI(5),
];

executeAsyncTasks(promises);

async function executeAsyncTasks(promises) {
  for (let promise of promises) {
    try {
      let res = await promise();
      console.log(res, "res*");
    } catch (e) {
      console.log(e, "error");
    }
  }
}


2. function executeAsyncTasks(promises) {
  let currentPromise = promises.shift();
  if (!currentPromise) {
    console.log('returning')
    return;
  }
  currentPromise()
    .then(res => {
      console.log(res, "res*");
      executeAsyncTasks(promises);
    })
    .catch(e => {
      console.log(e, "error*");
      executeAsyncTasks(promises);
    });
}


3. 
function executeAsyncTasks(promises) {
  promises.reduce((acc, curr) => {
    return acc
      .then(() => {
        return curr()
          .then(res => console.log(res, "res*"))
          .catch(e => {
            console.log(e, "error*");
            return Promise.resolve(); // keep the chain going
          });
      })

  }, Promise.resolve());
}
