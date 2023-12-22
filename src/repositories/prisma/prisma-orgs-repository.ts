import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository';

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async create(data: Prisma.ORGCreateInput) {
    const orgs = await prisma.oRG.create({ data , })
    return orgs
  }
}