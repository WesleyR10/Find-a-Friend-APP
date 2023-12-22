import { Prisma, ORG } from '@prisma/client'

export interface OrgsRepository {
  findByEmail(email: string): Promise<ORG | null>
  create(data: Prisma.ORGCreateInput): Promise<ORG>
}