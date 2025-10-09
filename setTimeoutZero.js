console.log("Hello World!");

var a = 1078698;
var b = 20986;

// this callback will be pushed to callstack in v8 once the callstack is empty
setTimeout(() => {
  console.log("Call me right now!!!");
}, 0); // Trust issue: 0 mili second after the callstack of main thread is empty!

setTimeout(() => {
  console.log("Call me after 3 seconds");
}, 3000);

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("Multiplication result is:", c);

// any async function (callback) will executes once the global execution context finished executing and leaves the callstack empty.
// i.e we can only executes callback function once the callstack of main thread is free.
