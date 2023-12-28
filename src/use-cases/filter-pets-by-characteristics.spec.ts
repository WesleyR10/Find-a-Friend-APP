import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { FilterPetByCharacteristicsUseCase } from './filter-pets-by-characteristics';
import { FilterByPetError } from './errors/filter-by-pet-error';

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FilterPetByCharacteristicsUseCase 

describe('Filter Pet By Characteristics Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FilterPetByCharacteristicsUseCase(petsRepository)
  })

  it('should filter pets by all characteristics', async () => {
    const org1 = await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const org2 =await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Belo Horizonte',
      address: 'Rua Teste, 123',
    })

    await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: true,
      age: 3,
    });
    
    await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: false,
      age: 3,
    });

    await petsRepository.create({
      org_id: org2.id,
      animalType: 'Cat',
      name: 'Whiskers',
      breed: 'Siamese',
      size: 'Small',
      available: true,
      age: 2,
    });

    const { pets } = await sut.execute({
        animalType: 'Dog',
        name: 'Max',
        breed: 'Labrador',
        size: 'Large',
        available: true,
        age: 3,
    })


    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Max' })])
  })

  it('should not filter pets because they are not available', async () => {
    const org1 = await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const org2 =await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Belo Horizonte',
      address: 'Rua Teste, 123',
    })

    await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: false,
      age: 3,
    });

    await petsRepository.create({
      org_id: org2.id,
      animalType: 'Cat',
      name: 'Whiskers',
      breed: 'Siamese',
      size: 'Small',
      available: false,
      age: 2,
    });

    await expect(() =>
    sut.execute({
        animalType: 'Dog', 
        // Possui o tipo dog mas o available é false
    }),
    ).rejects.toBeInstanceOf(FilterByPetError)    
  })

  it('should filter pets by all characteristics', async () => {
    const org1 = await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const org2 =await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Belo Horizonte',
      address: 'Rua Teste, 123',
    })

    await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: true,
      age: 3,
    });

    await petsRepository.create({
      org_id: org2.id,
      animalType: 'Dog',
      name: 'Rex',
      breed: 'pit-bull',
      size: 'Large',
      available: true,
      age: 3,
    });

    await petsRepository.create({
      org_id: org2.id,
      animalType: 'Cat',
      name: 'Whiskers',
      breed: 'Siamese',
      size: 'Small',
      available: true,
      age: 2,
    });

    const { pets } = await sut.execute({
        animalType: 'Dog',
        // Adicione outras características para filtrar
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Max' }),
      expect.objectContaining({ name: 'Rex' })
      ])
  })

  it('should not filter pets by characteristics  as the filter does not match', async () => {
    const org1 = await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const org2 =await orgsRepository.create({
      name: 'org_title',
      email: 'org@email.com',
      password_hash: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Belo Horizonte',
      address: 'Rua Teste, 123',
    })

    await petsRepository.create({
      org_id: org1.id,
      animalType: 'Dog',
      name: 'Max',
      breed: 'Labrador',
      size: 'Large',
      available: true,
      age: 3,
    });

    await petsRepository.create({
      org_id: org2.id,
      animalType: 'Cat',
      name: 'Whiskers',
      breed: 'Siamese',
      size: 'Small',
      available: true,
      age: 2,
    });

    await expect(() =>
    sut.execute({
        animalType: 'monkey', // Característica que não existe
    }),
    ).rejects.toBeInstanceOf(FilterByPetError)    
  })
})