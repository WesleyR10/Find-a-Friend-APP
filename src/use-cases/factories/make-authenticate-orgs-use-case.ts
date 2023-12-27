import { AuthenticateOrgsUseCase } from './../authenticate-orgs';
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgsUseCase = new AuthenticateOrgsUseCase(orgsRepository)

  return authenticateOrgsUseCase
}