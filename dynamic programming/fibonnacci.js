const fib = (n) => {
  const fib = [];
  if (n <= 1) {
    return n;
  }

  fib[0] = 0;
  fib[1] = 1;

  for (let index = 2; index <= n; index++) {
    fib[index] = fib[index - 2] + fib[index - 1];
  }
  return fib[n];
};

console.log(fib(3));
