import { fibonacci, factorial, complexCalculation } from '@frontend-build-tools-benchmark/shared';

export default function Home() {
  console.log('Turbopack build');
  console.log('Fibonacci(10):', fibonacci(10));
  console.log('Factorial(5):', factorial(5));
  console.log('Complex calculation:', complexCalculation(1, 2));

  return <div>Turbopack Benchmark</div>;
}
