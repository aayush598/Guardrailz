import { AuthSession } from '../domain/auth-session';

export interface AuthProvider {
  getSession(): Promise<AuthSession | null>;
}
