import { createHmac } from 'crypto';

export const getSignature = (params: any, secret: string, nonce: string) => {
  const signature = createHmac('sha256', secret)
    .update(nonce.toString())
    .digest('base64');

  return { signature: signature };
};
