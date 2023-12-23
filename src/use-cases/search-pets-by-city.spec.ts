import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsByCityUseCase } from './search-pets-by-city';

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsByCityUseCase(orgsRepository)
  })

  it('should search for pets in a city', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    await orgsRepository.create({
      id: 'org-02',
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Belo Horizonte',
      address: 'Rua Teste, 123',
    })

    await petsRepository.create({
      org_id: 'org-01',
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      age: 3,
    });

    await petsRepository.create({
      org_id: 'org-02',
      animalType: 'Cat',
      name: 'Whiskers',
      breed: 'Siamese',
      size: 'Small',
      age: 2,
    });
    
    const { pets } = await sut.execute({
      query: 'Belo Horizonte',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Whiskers' })])
  })

  it('should be able to fetch paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      await orgsRepository.create({
        id: `${i}`,
        name: 'org_title',
        email: 'org@email.com',
        password_hash: 'org_password',
        description: null,
        phone: '47 99999-9999',
        city: 'Rio do Sul',
        address: 'Rua Teste, 123',
      })

      await petsRepository.create({
        org_id: `${i}`,
        animalType: 'Dog',
        name: `Max ${i}`,
        breed: 'Labrador',
        size: 'Large',
        age: 3,
      });
    }

    const { pets } = await sut.execute({
      query: 'Rio do Sul',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Max 21' }),
      expect.objectContaining({ name: 'Max 22' }),
    ])
  })
})