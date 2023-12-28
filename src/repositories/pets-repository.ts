import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  filterPetByCharacteristics( animalType: string | undefined, breed: string | undefined, size: string | undefined, age: number | undefined, name: string | undefined, available:boolean | undefined ): Promise<Pet[]>
  updateAvailability(petId: string, available: boolean): Promise<void>;
}