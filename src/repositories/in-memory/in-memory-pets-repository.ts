import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  private orgsRepository: InMemoryOrgsRepository;
  constructor(orgsRepository: InMemoryOrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      animalType: data.animalType,
      name: data.name,
      breed: data.breed ?? null,
      size: data.size ?? null,
      age: data.age ?? null,
      org_id: data.org_id,
      created_at: new Date(),
    }
    this.items.push(pet)

   // Adicionar o pet à lista de pets da organização
    const org = await this.orgsRepository.findById(data.org_id);
    if (org) {
      this.orgsRepository.pets.push(pet);
    }

    return pet;
  }
}