import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data , })
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async filterPetByCharacteristics(data: Prisma.PetWhereInput){
    const pets = await prisma.pet.findMany({
      where: data, 
    })
    return pets
  }
  
  async updateAvailability(petId: string, available: boolean): Promise<void> {
    await prisma.pet.update({
      where: { id: petId },
      data: { available },
    });
  }

}