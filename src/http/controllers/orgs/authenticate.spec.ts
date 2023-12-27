import request from 'supertest'
import {app} from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe( 'Authenticate Orgs (e2e)' , () => {
  beforeAll(async () => {
    await app.ready() // Certifica que aplicação está pronta para receber requisições
  })

  afterAll(async () => {
    await app.close() // Encerra aplicação
  })

  it('should be able to authenticate Orgs', async () => {
    await request(app.server).post('/orgs').send({
      name: 'org_title',
      email: 'org@email.com',
      password: '123456',
      description: 'Org da região de Rio do Sul',
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })

    const response = await request(app.server).post('/sessionsOrg').send({
      email: 'org@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
