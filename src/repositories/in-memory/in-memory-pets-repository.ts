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
      available: data.available ?? true,
      org_id: data.org_id ,
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

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async filterPetByCharacteristics(data: Prisma.PetWhereInput): Promise<Pet[]> {
    const filteredPets = this.items.filter((pet) => {
      const matchAvailable = data.available === null || data.available === undefined || pet.available === data.available;
  
      if (pet.available && matchAvailable) {
        const matchAnimalType = !data.animalType || pet.animalType === data.animalType;
        const matchName = !data.name || pet.name === data.name;
        const matchBreed = !data.breed || pet.breed === data.breed;
        const matchSize = !data.size || pet.size === data.size;
        const matchAge = data.age === undefined || data.age === null || pet.age === data.age;
  
        return matchAnimalType && matchName && matchBreed && matchSize && matchAge;
      }
      return false;
    });
  
    return filteredPets;
  }
}