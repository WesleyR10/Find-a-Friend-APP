import { OrgsRepository } from '@/repositories/orgs-repository';
import { FilterByPetError } from './errors/filter-by-pet-error';
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  query: string
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.searchMany(query, page)
    const pets = await this.orgsRepository.getPetsByOrgs(orgs)

    const availablePets = pets.filter((pet) => pet.available);
    if (availablePets.length === 0) {
      throw new FilterByPetError();
    }

    return {
      pets,
    }
  }
}