import { PetNotFoundError } from '@/use-cases/errors/pet-not-found';
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const org1 = await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const createdPet = await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: true,
      age: 3,
    });

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Max')
    expect(pet.breed).toEqual('Labrador')
    expect(pet.size).toEqual('Large')
  })

  it('should throw if pet is not found', async () => {    
    await expect(
      sut.execute({
        petId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})