export function getLocalStorage(key: string): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || '';
  }

  return '';
}
