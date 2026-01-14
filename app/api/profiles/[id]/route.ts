export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/shared/auth';
import { db } from '@/shared/db/client';
import { profiles } from '@/shared/db/schema';
import { and, eq } from 'drizzle-orm';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { dbUser } = await requireAuth();
  const body = await req.json();

  const [updated] = await db
    .update(profiles)
    .set({
      name: body.name,
      description: body.description,
      inputGuardrails: body.inputGuardrails,
      outputGuardrails: body.outputGuardrails,
      toolGuardrails: body.toolGuardrails,
    })
    .where(and(eq(profiles.id, params.id), eq(profiles.userId, dbUser.id)))
    .returning();

  return NextResponse.json({ profile: updated });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { dbUser } = await requireAuth();

  await db.delete(profiles).where(and(eq(profiles.id, params.id), eq(profiles.userId, dbUser.id)));

  return NextResponse.json({ success: true });
}
