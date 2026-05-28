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
  dummyApiCallSimulation(500),
];

callsArray.reduce((acc, curr) => {
  return acc
    .then(res => {
      console.log(res, "res");
      return curr().then(resp => {
        return resp + 12;
      });
    })
    .catch(e => {
      console.log(e, "err");
    });
}, Promise.resolve(12));
