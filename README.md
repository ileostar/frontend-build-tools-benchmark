# 前端构建工具性能比较

这个项目旨在比较不同前端构建工具的性能,包括构建时间和内存使用。

## 支持的构建工具

- Webpack
- Vite
- esbuild
- Rollup
- Parcel
- Rspack
- Turbopack (实验性)

## 使用方法

1. 安装依赖:

```bash
pnpm install
```

2. 运行基准测试:

```bash
pnpm benchmark
```

3. 查看可视化结果:

```bash
pnpm visualize
```

4. 运行基准测试并查看结果:

```bash
pnpm server
```

## 配置

你可以在`config.js`文件中修改配置,包括要测试的工具、运行次数等。

## 项目结构

- `packages/`: 包含各个构建工具的测试包
  - `shared/`: 共享的源代码
  - `webpack/`: Webpack 构建配置
  - `vite/`: Vite 构建配置
  - `esbuild/`: esbuild 构建配置
  - `rollup/`: Rollup 构建配置
  - `parcel/`: Parcel 构建配置
  - `rspack/`: Rspack 构建配置
  - `turbopack/`: Turbopack 构建配置 (实验性)
  - `benchmark/`: 基准测试脚本
- `visualize/`: 包含可视化结果的 Vue 应用
- `config.js`: 全局配置文件
- `benchmark-results.json`: 基准测试结果

## 注意事项

- Turbopack 目前处于实验阶段,其性能数据可能不稳定或不准确。
- 确保所有依赖都已正确安装,特别是新添加的 Rspack 和 Turbopack。
- 如果遇到模块解析问题,请检查 `pnpm-workspace.yaml` 和各个包的 `package.json` 文件。

## 贡献

欢迎提交 Issue 和 Pull Request! 如果你有任何改进建议或发现了 bug,请随时与我们联系。

## 许可

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。
