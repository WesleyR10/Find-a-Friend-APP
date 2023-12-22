import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeCreateOrgsUseCase(): CreateOrgUseCase {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const createOrgsUseCase = new CreateOrgUseCase(prismaOrgsRepository);
  
  return createOrgsUseCase;
}