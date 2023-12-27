import { OrgsRepository } from '@/repositories/orgs-repository';
import { PetNotFoundError } from './errors/pet-not-found';
import { PetsRepository } from '@/repositories/pets-repository';
import { AdoptionsRepository } from '@/repositories/adoptions-repository'
import { Adoption } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error';

interface AdoptionUseCaseRequest {
  userId: string;
  petId: string;
}

interface AdoptionUseCaseResponse {
  adoption: Adoption;
  phone: string | null;
}

export class AdoptionUseCase {
  constructor(
    private adoptionRepository: AdoptionsRepository,
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    ) {}

  async execute({
    userId,
    petId,
  }: AdoptionUseCaseRequest): Promise<AdoptionUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet || !pet.available) {
      throw new PetNotFoundError()
    }

    const adoption = await this.adoptionRepository.create({
      user_id: userId,
      pet_id: petId,
    })

    await this.petsRepository.updateAvailability(petId, false);

    const getOrgPhone = await this.orgsRepository.findById(pet.org_id) 

    if (!getOrgPhone) {
      throw new OrgNotFoundError();
    }
    
    const phone = getOrgPhone.phone 

    return {
      adoption,
      phone,
    }
  }
}