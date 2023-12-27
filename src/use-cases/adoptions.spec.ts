import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository';
import { AdoptionUseCase } from '@/use-cases/adoptions';
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found';
import { expect, describe, it, beforeEach } from 'vitest'

let adoptionRepository: InMemoryAdoptionsRepository
let usersRepository: InMemoryUsersRepository
let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: AdoptionUseCase

describe('Get Adoption Case', () => {
  beforeEach(() => {
    adoptionRepository = new InMemoryAdoptionsRepository()
    orgsRepository= new InMemoryOrgsRepository()
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new AdoptionUseCase(adoptionRepository, petsRepository, orgsRepository)
  })

  it('should be able to adoption pet', async () => {
    const user1  = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })


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

    const petAdoption = await sut.execute({
      userId: user1.id,
      petId: createdPet.id,
    });

    const updatedPet = await petsRepository.findById(createdPet.id);

    expect(updatedPet?.available).toBe(false);
    expect(petAdoption.phone).toEqual(org1.phone);
  })

  it('should not be able to adoption pet', async () => {    
    const user1  = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(
      sut.execute({
        userId: user1.id,
        petId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})