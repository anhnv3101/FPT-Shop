export const BASE_API_URL = import.meta.env.BASE_URL 

export const getImageUrl = (path: string): string => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_API_URL}${path}`;
};