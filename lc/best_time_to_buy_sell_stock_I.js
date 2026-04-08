var maxProfit = function (prices) {
  let minValue = Number.MAX_SAFE_INTEGER;
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    minValue = Math.min(prices[i], minValue);
    profit = Math.max(profit, prices[i] - minValue);
  }
  return profit;
};
