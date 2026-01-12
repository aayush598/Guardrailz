import { AuthService } from '@/shared/auth/service/auth.service';
import { UnauthorizedError } from '../domain/auth-errors';

export async function requireAuth() {
  const auth = new AuthService();

  try {
    return await auth.requireUser();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      throw err;
    }
    throw new UnauthorizedError();
  }
}
