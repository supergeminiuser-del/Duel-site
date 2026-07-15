import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { DuelService } from '@/services/duel.service';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const duel = await DuelService.createDuel((session.user as any).id, body);
    return NextResponse.json(duel, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}