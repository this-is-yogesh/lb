var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let output = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let last = output[output.length - 1];
    if (last[1] >= intervals[i][0]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      output.push(intervals[i]);
    }
  }

  return output;
};
