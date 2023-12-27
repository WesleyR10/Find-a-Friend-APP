import { AdoptionsRepository } from '@/repositories/adoptions-repository';
import {  Prisma, Adoption } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAdoptionsRepository implements AdoptionsRepository {
  public items: Adoption[] = []


  async create (data: Prisma.AdoptionUncheckedCreateInput) {
    const adoption = {
      id: randomUUID(),
      pet_id: data.pet_id,
      user_id: data.user_id,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      created_at: new Date(),
    }

    this.items.push(adoption)

    return adoption
  }
}