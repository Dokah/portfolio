export const isMobile = (): boolean => {
  if (typeof window === "undefined") return true
    return /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent);
  };