import { currentUser } from '@clerk/nextjs/server';
import { AuthProvider } from './auth.provider';
import { AuthSession } from '../domain/auth-session';

export class ClerkAuthProvider implements AuthProvider {
  async getSession(): Promise<AuthSession | null> {
    const user = await currentUser();
    if (!user) return null;

    return {
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? '',
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        imageUrl: user.imageUrl ?? undefined,
      },
      issuedAt: new Date(),
    };
  }
}
