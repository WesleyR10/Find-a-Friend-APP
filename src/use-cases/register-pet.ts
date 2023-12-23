import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";

interface RegisterPetUseCaseRequest { 
  animalType: string;
  name: string;
  breed: string | null;
  size: string | null;
  age: number | null;
  orgId: string;
}
interface RegisterPetUseCaseResponse { 
  pet: Pet
}  

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    ) {}

  async execute({ animalType,name, breed,size,age, orgId }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)
    
    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      animalType,
      name,
      breed,
      size,
      age,
      org_id: orgId,
    })

    return {pet}
  }
}