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

  updateAvailability(petId: string, available: boolean): Promise<void> {
    const pet = this.items.find((item) => item.id === petId)
    
    if (pet) {
      pet.available = available;
    }
    return Promise.resolve();
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async filterPetByCharacteristics(animalType: string | undefined, breed: string | undefined, size: string | undefined, age: number | undefined, name: string | undefined, available:boolean | undefined): Promise<Pet[]> {
    const filteredPets = this.items.filter((pet) => {
      const matchAvailable = available === null || available === undefined || pet.available === available;
  
      if (pet.available && matchAvailable) {
        const matchAnimalType = !animalType || pet.animalType === animalType;
        const matchName = !name || pet.name === name;
        const matchBreed = !breed || pet.breed === breed;
        const matchSize = !size || pet.size === size;
        const matchAge = age === undefined || age === null || pet.age === age;
  
        return matchAnimalType && matchName && matchBreed && matchSize && matchAge;
      }
      return false;
    });
  
    return filteredPets;
  }
}