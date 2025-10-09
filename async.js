const fs = require("node:fs"); // can also be written directly as "fs"
const https = require("https");

console.log("Hello World!");

var a = 1078698;
var b = 20986;

// synchronous
// blocking the main thread
// rest code will wait until it complete file reading
fs.readFileSync("./file.txt", "utf-8"); // you will notice that sync functions don't have callback functions
console.log("This will executes only after file reading completes");

// Async function
fs.readFile("./file.txt", "utf-8", (err, data) => {
  console.log("File data: ", data);
});

// setTimeout
setTimeout(() => {
  console.log("setTimeout called after 5 second!");
}, 5000);

// API call
https.get("https://dummyjson.com/products/1", (res) => {
  res.resume(); // Discards data but closes the stream (https.get), allow us to exit once code finishes executing.
  console.log("Fetched Data Successfully");
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("Multiplication result is:", c);

/**
 * 1. Why Node.js doesn't exit

Node.js automatically exits when its event loop is empty — meaning there are no pending timers, I/O operations, or network requests.

But in your case:

The https.get() call opens a network socket to fetch data.

Even after you log "Fetched Data Successfully", you don’t consume or close the response stream.

Since the stream (res) remains open and unread, Node.js keeps the event loop alive, waiting for it to finish.

That’s why it hangs until you press Ctrl + C
 */
