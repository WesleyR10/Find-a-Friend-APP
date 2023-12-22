import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";

interface RegisterPetUseCaseRequest { // Vou receber esses dados do controller
  name: string
  breed: string;
  age: number | null;
  orgId: string;
}

interface RegisterPetUseCaseResponse { // Vou retornar esses dados para o controller
  pet: Pet
}  

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    ) {}

  async execute({ name, breed, age, orgId }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)
    
    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      breed,
      age,
      org_id: orgId,
    })

    return {pet}
  }
}