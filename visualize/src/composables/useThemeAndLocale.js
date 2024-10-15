import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export function useThemeAndLocale() {
  const { locale } = useI18n();
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value);
  };

  const toggleLanguage = () => {
    locale.value = locale.value === 'en' ? 'zh' : 'en';
    localStorage.setItem('language', locale.value);
  };

  const initThemeAndLocale = () => {
    isDarkMode.value = localStorage.getItem('darkMode') === 'true';
    locale.value = localStorage.getItem('language') || 'en';
  };

  watch(isDarkMode, (newValue) => {
    document.documentElement.classList.toggle('dark', newValue);
  });

  return {
    isDarkMode,
    toggleDarkMode,
    toggleLanguage,
    initThemeAndLocale
  };
}
