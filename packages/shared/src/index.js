export const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const factorial = (n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// 添加更多复杂的函数以增加构建时间
export const complexCalculation = (x, y) => {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(x) * Math.cos(y);
  }
  return result;
};
