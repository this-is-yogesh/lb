/** write a function which will keep trying the api calls until retries are exhuasted */

function testPromise() {
  let count = 0;

  return () => {
    return new Promise((resolve, reject) => {
      count++;
      if (count > 7) {
        resolve("Promise resolved");
      } else {
        reject("Promise Reject");
      }
    });
  };
}

function retryPromise(func, retries) {
  return new Promise((resolve, reject) => {
    func()
      .then(res => {
        console.log("RESOLVED ONCE", retries);
        resolve(res);
      })
      .catch(e => {
        if (retries === 0) {
          console.log("REJECTED ONCE", retries);
          reject(e);
        }
        retryPromise(func, retries - 1)
          .then(res => {
            console.log("resolve->", retries);
            resolve(res);
          })
          .catch(e => {
            console.log("rejected->", retries);
            reject(e);
          });
      });
  });
}

retryPromise(testPromise(), 6)
  .then(res => {
    console.log(res, "Resolved Finally");
  })
  .catch(e => {
    console.log(e, "Rejected Finally");
  });
