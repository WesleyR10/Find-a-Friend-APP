import { prisma } from "@/lib/prisma";
import { Prisma, ORG, Pet } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository';

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.oRG.findMany({
      where: {
        city: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async getPetsByOrgs(orgs: ORG[]): Promise<Pet[]> {
    const orgIds = orgs.map(org => org.id);
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgIds,
        },
      },
    });
    return pets;
  }

  async create(data: Prisma.ORGCreateInput) {
    const orgs = await prisma.oRG.create({ data , })
    return orgs
  }
}