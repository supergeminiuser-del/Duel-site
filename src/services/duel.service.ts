import { prisma } from '@/lib/prisma';
import { DuelStatus } from '@prisma/client';
import { z } from 'zod';

const CreateDuelSchema = z.object({
  brainrotId: z.string(),
  wager: z.number().positive()
});

export class DuelService {
  static async createDuel(creatorId: string, data: z.infer<typeof CreateDuelSchema>) {
    const brainrot = await prisma.brainrot.findUnique({ where: { id: data.brainrotId } });
    if (!brainrot) throw new Error("Invalid Brainrot");

    return prisma.duel.create({
      data: {
        creatorId,
        status: DuelStatus.WAITING_OPPONENT,
      }
    });
  }

  static async joinDuel(duelId: string, opponentId: string) {
    const duel = await prisma.duel.findUnique({ where: { id: duelId } });
    if (!duel || duel.status !== DuelStatus.WAITING_OPPONENT) throw new Error("Duel not available");

    return prisma.duel.update({
      where: { id: duelId },
      data: { opponentId, status: DuelStatus.VERIFICATION }
    });
  }

  static async confirmWinner(duelId: string, winnerId: string) {
    const duel = await prisma.duel.update({
      where: { id: duelId },
      data: { status: DuelStatus.COMPLETED, winnerId, completedAt: new Date() }
    });

    await prisma.user.update({ where: { id: winnerId }, data: { wins: { increment: 1 }, xp: { increment: 100 } } });
    if (duel.opponentId && duel.opponentId !== winnerId) {
      await prisma.user.update({ where: { id: duel.opponentId }, data: { losses: { increment: 1 } } });
    } else if (duel.creatorId !== winnerId) {
      await prisma.user.update({ where: { id: duel.creatorId }, data: { losses: { increment: 1 } } });
    }

    return duel;
  }
}