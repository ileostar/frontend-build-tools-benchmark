<template>
  <div
    :class="['bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl', { 'dark': isDarkMode }]">
    <h2 class="text-lg md:text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">{{ title }}</h2>
    <div class="w-full h-64 md:h-80">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['chartType', 'chartData', 'options', 'title', 'isDarkMode']);
const chartRef = ref(null);
let chart = null;

const createChart = () => {
  console.log('Creating chart:', props.title);
  console.log('Chart data:', props.chartData);
  console.log('Chart type:', props.chartType);
  if (!chartRef.value) {
    console.error('Chart ref is null');
    return;
  }
  const ctx = chartRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: props.chartType,
    data: props.chartData,
    options: {
      ...props.options,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value} ms`;
            }
          }
        },
        legend: {
          labels: {
            color: props.isDarkMode ? '#fff' : '#666'
          }
        }
      },
      scales: props.chartType !== 'pie' && props.chartType !== 'radar' ? {
        x: {
          ticks: { color: props.isDarkMode ? '#fff' : '#666' },
          grid: { color: props.isDarkMode ? '#444' : '#ddd' }
        },
        y: {
          ticks: { color: props.isDarkMode ? '#fff' : '#666' },
          grid: { color: props.isDarkMode ? '#444' : '#ddd' }
        }
      } : {}
    }
  });
};

onMounted(() => {
  console.log('ChartComponent mounted:', props.title);
  if (props.chartData) {
    createChart();
  } else {
    console.log('No chart data available on mount');
  }
});

watch(() => props.chartData, (newData) => {
  console.log('Chart data changed:', props.title);
  if (newData && chart) {
    console.log('Updating existing chart');
    chart.data = newData;
    chart.update();
  } else if (newData && !chart) {
    console.log('Creating new chart');
    createChart();
  } else {
    console.log('No chart data available');
  }
}, { deep: true });

watch(() => props.isDarkMode, () => {
  console.log('Dark mode changed:', props.isDarkMode);
  if (chart) {
    chart.destroy();
    createChart();
  }
});

onUnmounted(() => {
  console.log('ChartComponent unmounted:', props.title);
  if (chart) {
    chart.destroy();
  }
});
</script>
