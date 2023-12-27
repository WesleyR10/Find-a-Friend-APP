import request from 'supertest'
import {app} from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe( 'Register orgs (e2e)' , () => {
  beforeAll(async () => {
    await app.ready() // Certifica que aplicação está pronta para receber requisições
  })

  afterAll(async () => {
    await app.close() // Encerra aplicação
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'org_title',
      email: 'org@email.com',
      password: 'org_password',
      description: null,
      phone: '47 99999-9999',
      city: 'Rio do Sul',
      address: 'Rua Teste, 123',
    })
    expect(response.statusCode).toEqual(201)
  })
})
