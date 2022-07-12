import cache from 'memory-cache';

import { cachedFetch } from '@/lib/cache';

const result = {};
const url = 'https://posos.com';
const fetchMock = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(result),
  })
) as jest.Mock;

global.fetch = fetchMock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe(`Given 'cachedFetch' is called`, () => {
  describe(`and the requested URL is not cached`, () => {
    it('call fetch and store the result', async () => {
      jest.spyOn(cache, 'get').mockReturnValue(null);
      const putSpy = jest.spyOn(cache, 'put');

      const res = await cachedFetch(url);
      expect(res).toMatchObject(result);
      expect(fetchMock).toHaveBeenCalledWith(url);
      expect(putSpy).toHaveBeenCalledWith(url, result, 3600000);
    });
  });
  describe(`and the requested URL is cached`, () => {
    it('return the cached result', async () => {
      jest.spyOn(cache, 'get').mockReturnValue(result);
      const putSpy = jest.spyOn(cache, 'put');
      const res = await cachedFetch(url);
      expect(res).toMatchObject(result);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(putSpy).not.toHaveBeenCalled();
    });
  });
});
