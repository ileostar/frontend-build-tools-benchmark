import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    pageTitle: 'Frontend Build Tools Performance Comparison',
    barChartTitle: 'Build Time Comparison (Bar Chart)',
    memoryChartTitle: 'Memory Usage Comparison (Bar Chart)',
    horizontalBarChartTitle: 'Build Time Comparison (Horizontal Bar Chart)',
    pieChartTitle: 'Build Time Comparison (Pie Chart)',
    radarChartTitle: 'Build Time and Memory Usage Comparison (Radar Chart)',
    loading: 'Loading...',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    footer: '© {year} Frontend Build Tools Performance Comparison. All rights reserved.',
    environmentInfo: 'Environment Information',
    os: 'Operating System',
    cpu: 'CPU',
    cores: 'CPU Cores',
    memory: 'Total Memory',
    nodeVersion: 'Node.js Version',
    error: 'Error loading data',
    noData: 'No data available',
    emptyData: 'The benchmark data is empty'
  },
  zh: {
    pageTitle: '前端构建工具性能比较',
    barChartTitle: '构建时间比较 (柱状图)',
    memoryChartTitle: '内存使用比较 (柱状图)',
    horizontalBarChartTitle: '构建时间比较 (水平条形图)',
    pieChartTitle: '构建时间比较 (饼图)',
    radarChartTitle: '构建时间和内存使用比较 (雷达图)',
    loading: '加载中...',
    darkMode: '暗黑模式',
    lightMode: '明亮模式',
    footer: '© {year} 前端构建工具性能比较. 所有权利保留.',
    environmentInfo: '运行环境信息',
    os: '操作系统',
    cpu: 'CPU',
    cores: 'CPU核心数',
    memory: '总内存',
    nodeVersion: 'Node.js版本',
    error: '加载数据时出错',
    noData: '没有可用的数据',
    emptyData: '基准测试数据为空'
  }
};

export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'en', // 设置默认语言
  fallbackLocale: 'en', // 设置回退语言
  messages,
});
