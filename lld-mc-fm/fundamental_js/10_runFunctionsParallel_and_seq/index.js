/**
 * The problem statement reads as:

Write two functions:
A() returns 2 after 2 seconds
B() returns 3 after 3 seconds
Return their sum in two ways:
Parallel execution → Total time: 3 seconds
Sequential execution → Total time: 5 seconds
This problem evaluates where you understanding of asynchronous programming in JavaScript.
 */

function A() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2);
    }, 5000);
  });
}

function B() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(3);
    }, 9000);
  });
}
async function sequence() {
  let start = performance.now();

  await A();
  await B();
  //is sequential because B doesnt start until A finishes
  let end = performance.now();

  console.log(end - start, "seq");
}

async function parallel() {
  let start = performance.now();

  const promiseA = A(); // starts immediately
  const promiseB = B(); // starts immediately

  await promiseA;
  await promiseB;
  //is concurrent because both was started before
  //awaiting and we are waiting for the slowest one to finish
  let end = performance.now();
  console.log(end - start, "parallel");
}

sequence();
parallel();
