import { OrgsRepository } from '@/repositories/orgs-repository'
import { ORG, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      description: data.description ?? null,
      phone: data.phone,
      city: data.city,
      address: data.address,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}