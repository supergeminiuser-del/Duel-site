import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const Schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = Schema.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const { username, email, password } = validation.data;
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { username, email, passwordHash } });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}