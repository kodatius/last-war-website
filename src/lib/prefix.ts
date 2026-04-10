export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function img(path: string) {
  return `${BASE}${path}`;
}
