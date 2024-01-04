export function a(key: string): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || '';
  }

  return '';
}
