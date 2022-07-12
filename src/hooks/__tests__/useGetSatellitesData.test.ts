import { renderHook } from '@testing-library/react-hooks';

import { useGetSatellitesData } from '@/hooks/useGetSatellitesData';

import {
  mockedPasses,
  mockedPosition,
  mockedPosition2,
  mockedSatellitePassesInfo,
  mockedSatellitePassesInfo2,
  mockedSatellitesData,
} from '@/mocks/data';

const fetchMock = jest.fn();

global.fetch = fetchMock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe(`Given 'useGetSatellitesData' is called`, () => {
  describe(`and 'get' method is called`, () => {
    it('should call global.fetch twice and merge the results', async () => {
      fetchMock
        .mockReturnValueOnce({
          json: () =>
            Promise.resolve([
              { positions: [mockedPosition] },
              { positions: [mockedPosition2] },
            ]),
        })
        .mockReturnValueOnce({
          json: () =>
            Promise.resolve([
              {
                info: mockedSatellitePassesInfo,
                passes: mockedPasses,
              },
              {
                info: mockedSatellitePassesInfo2,
                passes: [],
              },
            ]),
        });
      const { result } = renderHook(() => useGetSatellitesData());

      const data = await result.current.get();
      expect(data).toMatchObject(mockedSatellitesData);
    });
  });
  describe(`and fetch call fails`, () => {
    it('should return undefined', async () => {
      fetchMock.mockReturnValueOnce(Promise.reject());

      const { result } = renderHook(() => useGetSatellitesData());

      const data = await result.current.get();
      expect(data).toBeUndefined();
    });
  });
});
