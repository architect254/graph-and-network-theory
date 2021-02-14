// Fibonnacci sequence in divide and conquer strategy
// This will give the nth value of the sequence
const fib = (n) => {
  if (n <= 1) {
    return n;
  }

  return fib(n - 2) + fib(n - 1);
};

console.log(fib(3));
