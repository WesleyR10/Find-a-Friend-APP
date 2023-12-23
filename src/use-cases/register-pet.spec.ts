import { RegisterPetUseCase } from '@/use-cases/register-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach, } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    orgsRepository.items.push({    
      id: 'org-01',
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const { pet } = await sut.execute({
      name: 'pet_name',
      breed: 'pit-bull',
      age: null,
      orgId: 'org-01',
    })
    expect(pet.id).toEqual(expect.any(String))
  })


  it("shouldn't be possible to register a pet because the org doesn't exist", async () => {
    orgsRepository.items.push({    
      id: 'org-01',
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    await expect( () => sut.execute({
      name: 'pet_name',
      breed: 'pit-bull',
      age: null,
      orgId: 'org_not_existent',
    })
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})