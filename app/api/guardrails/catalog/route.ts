export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import '@/modules/guardrails/registry';
import { guardrailRegistry } from '@/modules/guardrails/engine/registry';

export async function GET() {
  const all = guardrailRegistry.list();

  return NextResponse.json({
    guardrails: all.map((name) => ({
      name,
    })),
  });
}
