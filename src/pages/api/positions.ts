// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { cachedFetch } from '@/lib/cache';

export default async function positions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Temporarily call local hello api
  // TODO: Call n2yo
  const data = await cachedFetch('http://localhost:3000/api/hello');
  res.status(200).json(data);
}
