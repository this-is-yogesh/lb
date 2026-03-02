/**1-- .then has two callbacks, one for resovle, one for reject, using catch was logging resolved value first and then rejected bbut this is fine */
const testPromise = () => {
  let count = 0;

  return () => {
    return new Promise((resolve, reject) => {
      count++;
      if (count <= 5) {
        reject(`promise rejected `);
      } else {
        resolve(`promise resolved`);
      }
    });
  };
};

// let runFunction = testPromise();
// runFunction(1).then(
//   res => console.log(res),
//   e => console.log(e),
// );
// runFunction(2).then(
//   res => console.log(res),
//   e => console.log(e),
// );
// runFunction(3).then(
//   res => console.log(res),
//   e => console.log(e),
// );

/** */
//actual implementation

/**
 * step1- 1
 * step2- 2
 * step3- 2
 * step2- 1
 * step1- 2
 * step3- 1
 * step4-ref- 1
 * laststep-finalERR
 */

function retry(fn, retries, finalError) {
  return new Promise((resolve, reject) => {
    fn().then(
      res => resolve(res),
      err => {
        if (retries === 1) {
          reject(finalError);
        }
        retry(fn, retries - 1, finalError).then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          },
        );
      },
    );
  });
}

/**2--doing the async way */

// async function retry(fn, retries, finalError) {
//   try {
//     let response = await fn();
//     return response;
//   } catch (e) {
//     if (retries === 1) {
//       return Promise.reject(finalError);
//     }
//     return retry(fn, retries - 1, finalError);
//   }
// }

retry(testPromise(), 3, "Final message").then(
  res => console.log(res, "finalRES"),
  err => console.log(err, "laststep-finalERR"),
);
