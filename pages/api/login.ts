import { NextApiRequest, NextApiResponse } from 'next';

import { httpInstance } from '@src/api/httpInstance';
import { IAuth } from '@src/models/IAuth';

const EXPIRED_TIME = 999999;

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
    const data = await httpInstance.post<IAuth>('http://localhost:8000/login', {
      email,
      password,
    });

    const accessToken = data?.accessToken;
    // const expiredTime = EXPIRED_TIME;

    res.setHeader('Set-Cookie', [`token=${accessToken}; HttpOnly; path=/;`]);
    res.status(200).json(data);
  } catch (e) {
    res.status(401).json({ status: 401, message: 'Invalid Email or Password' });
  }
}
