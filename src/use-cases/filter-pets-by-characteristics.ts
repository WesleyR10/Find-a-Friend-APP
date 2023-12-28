import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client'
import { FilterByPetError } from './errors/filter-by-pet-error';

interface FilterPetsUseCaseRequest {
  animalType?: string;
  breed?: string;
  size?: string;
  age?: number;
  name?: string;
  available?: boolean;
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    animalType,
    breed,
    size,
    age,
    name,
    available,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPetByCharacteristics(  
      animalType ,
      breed,
      size,
      age,
      name,
      available,)
    
      const petAvailable = pets.some(pet => pet.available === true);

    if (pets.length <= 0 || !petAvailable ) {
      throw new FilterByPetError()
    }
    
    return {
      pets,
    }
  }
}