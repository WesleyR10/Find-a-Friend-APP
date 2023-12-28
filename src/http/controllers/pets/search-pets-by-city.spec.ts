import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token, orgId } = await createAndAuthenticateOrgs(app, true) // true = isAdmin

    await request(app.server)
    .post(`/orgs/${orgId}/pets`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      animalType: 'dog',
      name: 'max',
      breed: 'pit-bull',
      size: 'large',
      age: 1,
    })

    await request(app.server)
    .post(`/orgs/${orgId}/pets`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      animalType: 'dog',
      name: 'max',
      breed: 'pit-bull',
      size: 'large',
      age: 1,
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        q: 'Rio do Sul',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining( {name: 'max',}),
        expect.objectContaining( {name: 'max',}),
    ])
  })
})