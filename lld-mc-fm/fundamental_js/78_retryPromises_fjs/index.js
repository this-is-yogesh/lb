function testPromise() {
  let count = 0;

  return () => {
    return new Promise((resolve, reject) => {
      count++;
      if (count <= 7) {
        reject(`Reject count ${count}`);
      } else {
        resolve(`Resolved Count ${count}`);
      }
    });
  };
}

function retry(func, retries) {
  return new Promise((resolve, reject) => {
    func()
      .then(res => {
        console.log(`RESOLVED CALLED ONCE, retries: ${retries}`);
        resolve(res);
      })
      .catch(err => {
        console.log(`called REJECTED, retries: ${retries}`);
        if (retries === 0) {
          console.log(`REJECTED CALLED ONCE, retries: ${retries}`);
          reject(err);
        } else {
          retry(func, retries - 1)
            .then(res => {
              console.log(`resolved called-> retries: ${retries}`);
              resolve(res);
            })
            .catch(err => {
              console.log(`rejected called-> retries: ${retries}`);
              reject(err);
            });
        }
      });
  });
}

retry(testPromise(), 5)
  .then(res => {
    console.log("Final", res);
  })
  .catch(err => {
    console.log("Final", err);
  });
