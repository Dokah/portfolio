export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return true;

  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const isSmallScreen = window.innerWidth <= 1024;

  return isCoarsePointer && isSmallScreen;
};

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}