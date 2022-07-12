import { NextApiRequest, NextApiResponse } from 'next';

import * as Cache from '@/lib/cache';

import positions from '@/pages/api/positions';

jest.mock('@/satellites.json', () => {
  return [{ id: 'sat1' }, { id: 'sat2' }];
});

describe(`Given 'positions' is called`, () => {
  it('should call the positions api for each satellite and return an array of all the results', async () => {
    const cachedFetchSpy = jest
      .spyOn(Cache, 'cachedFetch')
      .mockResolvedValueOnce({ name: 'sat1' })
      .mockResolvedValueOnce({ name: 'sat2' });
    const resJson = jest.fn();
    await positions(
      {} as NextApiRequest,
      {
        status: () => {
          return {
            json: resJson,
          };
        },
      } as unknown as NextApiResponse
    );

    expect(resJson).toHaveBeenCalledWith([{ name: 'sat1' }, { name: 'sat2' }]);
    expect(cachedFetchSpy).toHaveBeenCalledTimes(2);
    expect(cachedFetchSpy.mock.calls[0][0]).toContain('/positions/sat1/');
    expect(cachedFetchSpy.mock.calls[1][0]).toContain('/positions/sat2/');
  });

  it('should return http status 500 if there was an error', async () => {
    jest.spyOn(Cache, 'cachedFetch').mockRejectedValue({});
    const resStatus = jest.fn();
    await positions(
      {} as NextApiRequest,
      {
        status: resStatus,
      } as unknown as NextApiResponse
    );

    expect(resStatus).toHaveBeenCalledWith(500);
  });
});
