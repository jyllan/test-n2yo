// /visualpasses/{id}/{observer_lat}/{observer_lng}/{observer_alt}/{days}/{min_visibility}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { cachedFetch } from '@/lib/cache';

import satellites from '@/satellites.json';

const MIN_VISIBILITY_DURATION = 300; // seconds // -> 5 minutes
export const DAYS_OF_PREDICTION = 2;

export default async function visualPasses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await Promise.all(
      satellites.map(
        async (satellite) =>
          await cachedFetch(
            `${process.env.n2yoAPI_URL}/visualpasses/${satellite.id}/${process.env.OFFICE_LAT}/${process.env.OFFICE_LNG}/${process.env.OFFICE_ALT}/${DAYS_OF_PREDICTION}/${MIN_VISIBILITY_DURATION}&apiKey=${process.env.n2yoAPI_KEY}`
          )
      )
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
}
