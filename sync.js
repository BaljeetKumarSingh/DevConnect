console.log("Hello World!");

var a = 1078698;
var b = 20986;

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("Multiplication result is:", c);

// v8 engine executes each code line by line
// even before executing code v8 creates GEC containg all the varibles with initial value undefined and function definations and push it into callStack of main thread.
// first of all sync executes first line console.log("Hello World!"), then
// stores a and b in value in memory heap
// then it goes to var c and finds a function call
// as soon as it finds the function call it create another execution context (FEC) and similarly stores all the parameters and variables and functions if any
// then assign the values to those parameter from argument passed to the function calls,
// and then start executing line by line and returns the output from where it was called i.e. var c and remove from call stack
// and then GEC executes the last line and console log the Multiplication result and leave the callstack.
