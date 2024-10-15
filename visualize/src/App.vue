<script setup>
import { onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ChartComponent from './components/ChartComponent.vue';
import { useChartData } from './composables/useChartData';
import { useThemeAndLocale } from './composables/useThemeAndLocale';

const { t, locale } = useI18n();
const { benchmarkData, environmentInfo, loading, error, fetchData, getChartData } = useChartData();
const { isDarkMode, toggleDarkMode, toggleLanguage, initThemeAndLocale } = useThemeAndLocale();

const charts = computed(() => [
  { type: 'bar', title: t('barChartTitle'), dataKey: 'time', options: {} },
  { type: 'bar', title: t('memoryChartTitle'), dataKey: 'memory', options: {} },
  { type: 'bar', title: t('horizontalBarChartTitle'), dataKey: 'time', options: { indexAxis: 'y' } },
  { type: 'pie', title: t('pieChartTitle'), dataKey: 'time', options: {} },
  { type: 'radar', title: t('radarChartTitle'), dataKey: 'both', options: {} }
]);

onMounted(async () => {
  console.log('App mounted');
  initThemeAndLocale();
  try {
    await fetchData();
    console.log('Data fetched successfully');
    if (!benchmarkData.value) {
      console.error('Benchmark data is null after fetching');
    }
  } catch (e) {
    console.error('Error in onMounted:', e);
  }
});
</script>

<template>
  <div :class="['min-h-screen w-full transition-colors duration-300', { 'dark': isDarkMode }]">
    <header class="bg-blue-600 dark:bg-blue-800 text-white py-6 w-full sticky top-0 z-10 shadow-md transition-colors duration-300">
      <h1 class="text-2xl md:text-3xl font-bold text-center">{{ t('pageTitle') }}</h1>
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="toggleDarkMode"
          class="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-300">
          {{ isDarkMode ? t('lightMode') : t('darkMode') }}
        </button>
        <button @click="toggleLanguage"
          class="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-300">
          {{ locale === 'en' ? '中文' : 'English' }}
        </button>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-center text-xl md:text-2xl text-blue-600 dark:text-blue-400 animate-pulse">{{ t('loading') }}</div>
      <div v-else-if="error" class="text-center text-xl md:text-2xl text-red-600 dark:text-red-400">
        {{ t('error') }}: {{ error }}
        <pre class="mt-4 text-left text-sm overflow-auto bg-gray-100 dark:bg-gray-800 p-4 rounded">{{ JSON.stringify(error, null, 2) }}</pre>
      </div>
      <div v-else-if="!benchmarkData" class="text-center text-xl md:text-2xl text-red-600 dark:text-red-400">{{ t('noData') }}</div>
      <div v-else-if="Object.keys(benchmarkData).length === 0" class="text-center text-xl md:text-2xl text-red-600 dark:text-red-400">
        {{ t('emptyData') }}</div>
      <div v-else>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-300">
          <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">{{ t('environmentInfo') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(value, key) in environmentInfo" :key="key"
              class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ t(key) }}:</span>
              <span class="text-gray-900 dark:text-gray-100">{{ value }}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartComponent v-for="chart in charts" :key="chart.title" :chartType="chart.type"
            :chartData="getChartData(chart.dataKey)" :options="chart.options" :title="chart.title"
            :isDarkMode="isDarkMode" />
        </div>
      </div>
    </main>
    <footer class="bg-gray-800 text-white py-4 text-center mt-8">
      <p class="text-sm md:text-base">{{ t('footer', { year: new Date().getFullYear() }) }}</p>
    </footer>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100;
}

.dark {
  color-scheme: dark;
}
</style>
