import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useResponsive() {
  const windowWidth = ref(window.innerWidth);

  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWindowWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
  });

  const gridColumns = computed(() => {
    if (windowWidth.value >= 1280) return 'grid-cols-3';
    if (windowWidth.value >= 768) return 'grid-cols-2';
    return 'grid-cols-1';
  });

  return {
    windowWidth,
    gridColumns
  };
}
