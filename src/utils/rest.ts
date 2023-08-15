import { createHmac } from 'crypto';

export const getSignature = (secret: string, nonce: string) => {
  return createHmac('sha256', secret).update(nonce.toString()).digest('base64');
};
