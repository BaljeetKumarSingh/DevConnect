require("./xyz"); // add one module in another module

// const { calculateSum } = require("./calculate/sum");
// const { calculateMultiply } = require("./calculate/multiply");

const { calculateSum, calculateMultiply } = require("./calculate"); // by default it takes ./calculate/index
const data = require("./data.json"); // importing json data

console.log(data);

var x = 10;
var y = 20;
calculateSum(x, y);
calculateMultiply(x, y);
console.log("app.js code!");
