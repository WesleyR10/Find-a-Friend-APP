import { PetsRepository } from '@/repositories/pets-repository';
import { Pet, Prisma } from '@prisma/client'
import { FilterByPetError } from './errors/filter-by-pet-error';

interface FilterPetsUseCaseRequest {
  data: Prisma.PetWhereInput
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    data
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPetByCharacteristics(data)
    
    if (pets.length <= 0 ) {
      throw new FilterByPetError()
    }
    
    return {
      pets,
    }
  }
}