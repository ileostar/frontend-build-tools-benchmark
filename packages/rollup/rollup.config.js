import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',  // 确保这里指向正确的入口文件
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};
