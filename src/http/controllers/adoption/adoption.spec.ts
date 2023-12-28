import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Adoption Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adoption pets and after adopting pets appear as unavailable', async () => {
    const { token: tokenUser, userId } = await createAndAuthenticateUser(app, true) // true = isAdmin
    const { token: tokenOrg, orgId } = await createAndAuthenticateOrgs(app, true) // true = isAdmin

    const pet = await request(app.server)
    .post(`/orgs/${orgId}/pets`)
    .set('Authorization', `Bearer ${tokenOrg}`)
    .send({
      animalType: 'dog',
      name: 'max',
      breed: 'pit-bull',
      size: 'large',
      age: 1,
    })

    const petId = pet.body.registeredPet.pet.id

    const response = await request(app.server)
    .post(`/${userId}/${petId}/adoption`)
    .set('Authorization', `Bearer ${tokenUser}`)
    .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({phone: expect.any(String)}),
    )

    const responseFilter = await request(app.server)
      .get('/pets/filter')
      .query({
          animalType: 'dog',
          breed: 'pit-bull',
          age: 1,
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .send()

      expect(responseFilter.statusCode).toEqual(400)
    }) 
})