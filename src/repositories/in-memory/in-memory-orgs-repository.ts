import { OrgsRepository } from '@/repositories/orgs-repository'
import { ORG, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = []
  public pets: Pet[] = [] // Adicionar uma lista de pets para simular a relação

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

  async searchMany(query: string, page: number) {
    const filteredOrgs = this.items
      .filter((item) => item.city.includes(query))
      .slice((page - 1) * 20, page * 20);

    return filteredOrgs;
  }

  async getPetsByOrgs(orgs: ORG[]) {
    const pets: Pet[] = [];
    orgs.forEach((org) => {
      const orgPets = this.pets.filter((pet) => pet.org_id === org.id);
      pets.push(...orgPets);
    });
    return pets;
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
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