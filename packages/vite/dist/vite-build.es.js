const l = (o) => o <= 1 ? o : l(o - 1) + l(o - 2), e = (o) => o <= 1 ? 1 : o * e(o - 1), i = (o, r) => {
  let t = 0;
  for (let c = 0; c < 1e6; c++)
    t += Math.sin(o) * Math.cos(r);
  return t;
};
console.log("Vite build");
console.log("Fibonacci(10):", l(10));
console.log("Factorial(5):", e(5));
console.log("Complex calculation:", i(1, 2));
export {
  i as complexCalculation,
  e as factorial,
  l as fibonacci
};
