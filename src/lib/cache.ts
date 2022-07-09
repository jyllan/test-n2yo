import cache from 'memory-cache';

export const cachedFetch = async (url: string) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    // TODO: set to 1 hour
    const minutes = 0.5;
    const response = await fetch(url);
    const data = await response.json();
    cache.put(url, data, minutes * 1000 * 60);
    return data;
  }
};
