/**1-- .then has two callbacks, one for resovle, one for reject, using catch was logging resolved value first and then rejected bbut this is fine */
const testPromise = () => {
  let count = 0;

  return () => {
    return new Promise((resolve, reject) => {
      count++;
      if (count <= 5) {
        console.log("step2-",'count->',count);
        reject(`promise rejected count - ${count}`);
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
  console.log("step1-",'retries->',retries);
  return new Promise((resolve, reject) => {
    fn().then(
      res => resolve(res),
      err => {
        console.log("step3-",'retries->',retries);
       // console.log("err-", err, "retries-", retries);
        if (retries === 1) {
          console.log('finalError')
         // console.log("reject-1", "retries->", retries);
          reject(finalError);
        }
        retry(fn, retries - 1, finalError).then(
          res => {
            resolve(res);
          },
          err => {
          //  console.log("reject-2", err, "retries->", retries);
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

retry(testPromise(), 1, "Final message").then(
  res => console.log(res, "finalRES"),
  err => console.log(err, "laststep-finalERR"),
);
