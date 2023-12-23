import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";

interface RegisterPetUseCaseRequest { // Vou receber esses dados do controller
  animalType: string;
  name: string;
  breed: string | null;
  size: string | null;
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

  async execute({ animalType,name, breed,size,age, orgId }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    console.log('Data received:', { animalType, name, breed, size, age, orgId }); // Adicionando log para verificar os dados recebidos
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