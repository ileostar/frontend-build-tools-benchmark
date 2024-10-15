const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const config = global.config || require(path.resolve(__dirname, '../../../config.js'));

const getVersion = async (tool) => {
  try {
    const packageJsonPath = path.join(__dirname, `../../${tool}/package.json`);
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    return packageJson.devDependencies?.[tool] || packageJson.dependencies?.[tool] || '未知';
  } catch (error) {
    console.error(`获取 ${tool} 版本时出错:`, error.message);
    return '未知';
  }
};

const execPromise = (command, options) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

const getEnvironmentInfo = () => {
  return {
    os: `${os.type()} ${os.release()}`,
    cpu: os.cpus()[0].model,
    cores: os.cpus().length,
    memory: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
    nodeVersion: process.version,
  };
};

const runBenchmark = async () => {
  const results = {};
  const environmentInfo = getEnvironmentInfo();

  for (const tool of config.tools) {
    console.log(`运行 ${tool} 基准测试...`);
    const times = [];
    const memories = [];

    for (let i = 0; i < config.runs; i++) {
      try {
        const start = process.hrtime.bigint();
        const startMemory = process.memoryUsage().heapUsed;
        await execPromise(`cd packages/${tool} && pnpm build`, { stdio: 'inherit' });
        const end = process.hrtime.bigint();
        const endMemory = process.memoryUsage().heapUsed;

        const timeInMs = Number(end - start) / 1e6;
        const memoryUsed = (endMemory - startMemory) / 1024 / 1024; // MB

        times.push(timeInMs);
        memories.push(memoryUsed);

        console.log(`  运行 ${i + 1}: ${timeInMs.toFixed(2)} ms, 内存使用: ${memoryUsed.toFixed(2)} MB`);
      } catch (error) {
        console.error(`  运行 ${i + 1} 失败:`, error.message);
      }
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const avgMemory = memories.reduce((a, b) => a + b, 0) / memories.length;

    results[tool] = {
      time: avgTime,
      memory: avgMemory,
      version: await getVersion(tool)
    };

    console.log(`${tool} 平均时间: ${avgTime.toFixed(2)} ms, 平均内存使用: ${avgMemory.toFixed(2)} MB`);
  }

  const finalResults = {
    environment: environmentInfo,
    results: results
  };

  const resultsPath = config.resolve(config.outputPath);
  const resultsDir = path.dirname(resultsPath);

  await fs.mkdir(resultsDir, { recursive: true });
  await fs.writeFile(resultsPath, JSON.stringify(finalResults, null, 2));
  console.log(`基准测试完成。结果已保存到 ${config.outputPath}`);

  // 添加这行来验证生成的文件内容
  console.log('Generated results:', JSON.stringify(finalResults, null, 2));

  // 在写入文件后添加这行
  console.log('File content:', await fs.readFile(resultsPath, 'utf-8'));
};

runBenchmark().catch(error => {
  console.error('基准测试运行失败:', error);
  process.exit(1);
});
