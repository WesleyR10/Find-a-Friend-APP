import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetByCharacteristicsUseCase } from '../filter-pets-by-characteristics'

export function makeFilterPetByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const FilterPetPetUseCase = new FilterPetByCharacteristicsUseCase(petsRepository)

  return FilterPetPetUseCase
}