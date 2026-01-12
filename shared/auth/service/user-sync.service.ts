import { db } from '@/shared/db/client';
import { users } from '@/shared/db/schema';
import { eq } from 'drizzle-orm';
import { AuthUser } from '../domain/auth-user';

export class UserSyncService {
  async getOrCreate(authUser: AuthUser) {
    const [existing] = await db.select().from(users).where(eq(users.id, authUser.id)).limit(1);

    if (existing) return existing;

    const [created] = await db
      .insert(users)
      .values({
        id: authUser.id,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
      })
      .returning();

    return created;
  }
}
