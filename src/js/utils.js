const { a } = require("./common.js");
console.log(a);

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;

module.exports = {
  sum,
  sub,
};
