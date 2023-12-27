import { Prisma, Adoption } from '@prisma/client'

export interface AdoptionsRepository {
  create(data: Prisma.AdoptionUncheckedCreateInput): Promise<Adoption>
}