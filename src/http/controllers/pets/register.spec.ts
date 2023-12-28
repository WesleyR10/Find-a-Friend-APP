import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'

describe('Create Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pets', async () => {
    const { token, orgId } = await createAndAuthenticateOrgs(app, true) // true = isAdmin

    const response = await request(app.server)
      .post(`/orgs/${orgId}/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        animalType: 'dog',
        name: 'pet_name',
        breed: 'pit-bull',
        size: 'large',
        age: 1,
      })

    expect(response.statusCode).toEqual(201)
  })
})