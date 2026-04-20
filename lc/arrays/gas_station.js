/*
brute force
*/

let gas = [1, 2, 3, 4, 5];
let cost = [3, 4, 5, 1, 2];

const canCompleteCircuit = function (gas, cost) {
  for (let i = 0; i < gas.length; i++) {
    let isPossible = gas[i] - cost[i] > 0;
    if (!isPossible) {
      continue;
    }
    let gasLength = gas.length;
    let lastCurrent = i;
    let currentGas = gas[i];
    let current = i;
    while (currentGas) {
      let next = (current + 1) % gasLength;
      currentGas = currentGas - cost[current] + gas[next];
      current = next;
      if (currentGas - cost[current] < 0 || lastCurrent === current) {
        break;
      }
    }
    if (lastCurrent === current) {
      return lastCurrent;
    }
  }
  return -1;
};

//optimal

/** “total checks possibility, tank finds the answer.” */
const canCompleteCircuitOptimal = function (gas, cost) {
  let tank = 0;
  let total = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    let diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    console.log(total, tank, i);
    if (tank < 0) {
      start = i + 1;
      console.log("start->", start);
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
};

/**
 * 
 * let gas = [1, 2, 3, 4, 5];
let cost = [3, 4, 5, 1, 2];

 */
//console.log(canCompleteCircuit(gas, cost));
console.log(canCompleteCircuitOptimal(gas, cost));
