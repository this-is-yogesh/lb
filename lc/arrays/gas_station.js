/**
 * 
 * There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

 

Example 1:

Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
Example 2:

Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
 */


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
