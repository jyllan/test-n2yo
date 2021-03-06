// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { cachedFetch } from '@/lib/cache';

import satellites from '../../satellites.json';

export default async function positions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await Promise.all(
      satellites.map(
        async (satellite) =>
          await cachedFetch(
            `${process.env.n2yoAPI_URL}/positions/${satellite.id}/${process.env.OFFICE_LAT}/${process.env.OFFICE_LNG}/${process.env.OFFICE_ALT}/1&apiKey=${process.env.n2yoAPI_KEY}`
          )
      )
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
}
