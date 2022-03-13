import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IResult } from '@/shared/interfaces/result.interface';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { query } = req;
  const { term } = query;
  if (!term) {
    return res.status(400).json({ error: 'Missing query parameter: term' });
  }
  const response = await axios.get<IResult>(
    `https://pensador-api.vercel.app?term=${term}&max=${query?.max || 10 * 5}`
  );
  const { data } = response;
  return res.status(200).json(data);
};
export default handler;
