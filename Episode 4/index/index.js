const { multiply } = require("./mul");
const { sum } = require("./sum");

function calculate(a, b) {
  return {
    sum: sum(a, b),
    multiply: multiply(a, b),
  };
}

module.exports.calculate = calculate;
