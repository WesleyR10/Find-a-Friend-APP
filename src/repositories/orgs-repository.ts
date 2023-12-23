import { Prisma, ORG, Pet } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<ORG | null>
  findByEmail(email: string): Promise<ORG | null>
  searchMany(query: string, page: number): Promise<ORG[]>
  create(data: Prisma.ORGCreateInput): Promise<ORG>
  getPetsByOrgs(orgs: ORG[]): Promise<Pet[]>
}