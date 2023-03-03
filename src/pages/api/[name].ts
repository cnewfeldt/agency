import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { name } = request.query;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return response.end(`Hello ${name}!`);
}
