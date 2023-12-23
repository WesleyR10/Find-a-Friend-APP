import { SearchPetsByCityUseCase } from './../search-pets-by-city';
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeSearchPetsByCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const searchPetByCityUseCase = new SearchPetsByCityUseCase(orgsRepository)

  return searchPetByCityUseCase
}