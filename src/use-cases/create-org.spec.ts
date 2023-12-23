import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should to register as an ORG', async () => {
    const { org } = await sut.execute({
      name: 'org_title',
      email: 'org@email.com',
      password: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'org_title',
      email: 'org@email.com',
      password: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'org_password',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@email.com'

    await sut.execute({
      name: 'org_title',
      email,
      password: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    await expect(() =>
      sut.execute({
      name: 'org_title',
      email,
      password: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})