import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  filterPetByCharacteristics(data: Prisma.PetWhereInput): Promise<Pet[]>
  updateAvailability(petId: string, available: boolean): Promise<void>;
}