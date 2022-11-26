import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 405, message: 'Not allowed method' });
  }

  res.setHeader('Set-Cookie', [`token=expired; HttpOnly; path=/; max-age=0;`]);
  res.send(null);
}
