const crypto = require("crypto");

console.log("Hello World!");

var a = 1078698;
var b = 20986;

// Synchronous Function - IT WILL BLOCK THE MAIN THREAD - DON'T USE IT.

// pbkdf2 - Password Based Key Derivative Function

crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");
console.log("First Key Generated!");

setTimeout(() => {
  console.log("Call me right now !!");
}, 0); // it will be only called once the callstack of main thread is empty

// Async Function

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
  console.log("Second Key is Genereated!");
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("Multiplication result is:", c);
