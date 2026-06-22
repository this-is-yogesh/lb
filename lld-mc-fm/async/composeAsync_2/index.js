/**
 * This is essentially the callback-based equivalent of:
 * d(await c(await b(await a(5, 3))))
 * 
 * or 
 * 
 * a(5, 3, (err, r1) => {
  b(r1, (err, r2) => {
    c(r2, (err, r3) => {
      d(r3, (err, r4) => {
        done(err, r4);
      });
    });
  });
});
Write a utility:
composeAsync(d, c, b, a)
 */


function a(x, y, next) {
  setTimeout(() => {
    next(null, x * y);
  }, 100);
}
function b(z, next) {
  setTimeout(() => {
    next(null, z + 5);
  }, 100);
}
function c(r, next) {
  setTimeout(() => {
    next(null, r / 10);
  }, 100);
}
function d(f, next) {
  setTimeout(() => {
    next(null, f * 100);
  }, 100);
}
function done(error, result) {
  if (error) {
    console.log("error is ", error);
    throw error;
  }
  console.log(result);
}
const compose = composeAsync(d, c, b, a);
compose(5, 3, done);



function composeAsync(...args) {
  let i = 0;
  return (val1, val2, cb) => {
    let argsReversed = [...args].reverse();

    function call(arr, i) {
      function result(err, product) {
        if (err) {
          cb(err);
          return;
        }
        call([product], i + 1);
      }
      if (!argsReversed[i]) {
        cb(null, ...arr);
        return;
      }
      argsReversed[i](...arr, result);
    }
    call([val1, val2], i);
  };
}

