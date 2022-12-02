import { NextApiRequest, NextApiResponse } from 'next';

import { IAuth } from '@src/models/IAuth';
import httpInstance from '@src/api/httpInstance';

interface LoginApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function handler(
  req: LoginApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 405, message: 'Not allowed method' });
  }
  const { email, password } = req.body;

  try {
    const { data } = await httpInstance.post<IAuth>(`/login`, {
      email,
      password,
    });

    res.status(200).json(data);
  } catch (e) {
    res.status(401).json({ status: 401, message: 'Invalid Email or Password' });
  }
}
