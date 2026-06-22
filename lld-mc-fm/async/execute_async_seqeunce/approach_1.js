
// This is a dummy api call simulation function which will return a promise which will resolve after the timer time and if timer is 2000 it will reject the promise
function dummyApiCallSimulation(timer) {
  return function () {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (timer === 2000) {
          rej(`Errored out ${timer}`);
        } else {
          res(`Completed in ${timer}`);
        }
      }, timer);
    });
  };
}

const callsArray = [
  dummyApiCallSimulation(3000),
  dummyApiCallSimulation(700),
  dummyApiCallSimulation(2000),
  dummyApiCallSimulation(100),
];

async function processCallsinSeries(callsArray) {
  for (let call of callsArray) {
    try {
      let result = await call();
      console.log(result, "result*");
    } catch (e) {
      console.log(e, "error");
    }
  }
}
processCallsinSeries(callsArray);
