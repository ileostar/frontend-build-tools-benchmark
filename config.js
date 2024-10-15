const path = require('path');

const config = {
  tools: ['webpack', 'vite', 'esbuild', 'rollup', 'parcel', 'rspack', 'turbopack'],
  runs: 3,
  sharedPackageName: '@frontend-build-tools-benchmark/shared',
  outputPath: 'visualize/public/benchmark-results.json',
  resolve: (file) => path.resolve(__dirname, file)
};

module.exports = config;
