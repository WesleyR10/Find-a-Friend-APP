import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

import { AdoptionsRepository } from '@/repositories/adoptions-repository';

export class PrismaAdoptionsRepository implements AdoptionsRepository {
  async create(data: Prisma.AdoptionUncheckedCreateInput) {
    const adoption = await prisma.adoption.create({ data , })
    return adoption
  }

}