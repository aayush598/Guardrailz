import { AuthUser } from './auth-user';

export interface AuthSession {
  user: AuthUser;
  issuedAt?: Date;
  expiresAt?: Date;
}
