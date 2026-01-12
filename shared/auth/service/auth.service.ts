import { AuthProvider } from '../providers/auth.provider';
import { ClerkAuthProvider } from '../providers/clerk.provider';
import { UnauthorizedError } from '../domain/auth-errors';
import { UserSyncService } from './user-sync.service';

export class AuthService {
  private readonly provider: AuthProvider;
  private readonly userSync = new UserSyncService();

  constructor(provider?: AuthProvider) {
    this.provider = provider ?? new ClerkAuthProvider();
  }

  async requireUser() {
    const session = await this.provider.getSession();
    if (!session) {
      throw new UnauthorizedError();
    }

    const dbUser = await this.userSync.getOrCreate(session.user);
    return { authUser: session.user, dbUser };
  }

  async getOptionalUser() {
    const session = await this.provider.getSession();
    if (!session) return null;

    const dbUser = await this.userSync.getOrCreate(session.user);
    return { authUser: session.user, dbUser };
  }
}
