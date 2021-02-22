import { Request } from 'express';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface ProtectedRequest extends PublicRequest {
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
