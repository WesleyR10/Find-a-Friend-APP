import { Prisma, ORG } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<ORG | null>
  findByEmail(email: string): Promise<ORG | null>
  create(data: Prisma.ORGCreateInput): Promise<ORG>
}