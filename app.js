// require("./xyz"); // add one module in another module

// const { word, calculateSum } = require("./sum"); // requiring multiple items

import { word, calculateSum } from "./sum.js";

// in strict mode (module) it will give ref error
// but in not strict mode (commonjs) this will be executed error free
z = "hello world";

var x = 10;
var y = 20;
calculateSum(x, y);
console.log(word);
console.log("app.js code!");
