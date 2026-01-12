import { requireAuth } from '@/shared/auth';
import { db } from '@/shared/db/client';
import { profiles } from '@/shared/db/schema';
import { eq } from 'drizzle-orm';
import ProfilesClient from './ProfilesClient';

export default async function ProfilesPage() {
  const { dbUser } = await requireAuth();

  const data = await db.select().from(profiles).where(eq(profiles.userId, dbUser.id));

  return <ProfilesClient profiles={data} />;
}
