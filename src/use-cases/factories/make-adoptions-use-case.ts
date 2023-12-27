import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AdoptionUseCase } from '../adoptions'

export function makeAdoptionsUseCase() {
  const adoptionRepository = new PrismaAdoptionsRepository()
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new AdoptionUseCase(adoptionRepository, petsRepository, orgsRepository)

  return useCase
}