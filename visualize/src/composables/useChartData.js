import { ref, computed } from 'vue';

export function useChartData() {
  const benchmarkData = ref(null);
  const environmentInfo = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchData = async () => {
    try {
      console.log('Fetching data from:', '/benchmark-results.json');
      const response = await fetch('/benchmark-results.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response:', response);
      const data = await response.json();
      console.log('Parsed data:', data);
      if (!data.results) {
        throw new Error('Data structure is not as expected');
      }
      benchmarkData.value = data.results;
      environmentInfo.value = data.environment;
      console.log('Loaded benchmarkData:', benchmarkData.value);
      console.log('Loaded environmentInfo:', environmentInfo.value);
    } catch (e) {
      console.error('Error loading benchmark results:', e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const getChartData = (dataKey) => {
    if (!benchmarkData.value) {
      console.log('No benchmark data available');
      return null;
    }

    const labels = Object.keys(benchmarkData.value).map(tool => `${tool} (${benchmarkData.value[tool].version})`);
    let datasets = [];

    if (dataKey === 'time') {
      datasets = [{
        label: '构建时间 (毫秒)',
        data: Object.values(benchmarkData.value).map(result => result.time),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }];
    } else if (dataKey === 'memory') {
      datasets = [{
        label: '内存使用 (MB)',
        data: Object.values(benchmarkData.value).map(result => result.memory),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }];
    } else if (dataKey === 'both') {
      datasets = [
        {
          label: '构建时间 (毫秒)',
          data: Object.values(benchmarkData.value).map(result => result.time),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '内存使用 (MB)',
          data: Object.values(benchmarkData.value).map(result => result.memory),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ];
    }

    console.log('Generated chart data:', { labels, datasets });
    return { labels, datasets };
  };

  return {
    benchmarkData,
    environmentInfo,
    loading,
    error,
    fetchData,
    getChartData
  };
}
